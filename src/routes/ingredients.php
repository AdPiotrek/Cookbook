<?php
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;

    $app->put('/recipes/ingredient', function(Request $request, Response $response){
        try{
            $body = json_decode($request->getBody());
            $req = [];
            $db = new db();
            $db = $db->connect();
            foreach ($body as $ingredient){
                if ($db->has("ingredients",[
                    "nazwa" => $ingredient->name
                    ])
                ){
                    $ids = $db->select("ingredients",[
                        "id"
                    ],[
                        "nazwa" => $ingredient->name
                    ]);
                    array_push($req,$ids['0']['id']);
                }else{
                    $db->insert("ingredients",[
                        "nazwa"=> $ingredient->name
                    ]);
                    array_push($req,$db->id());
                }
            }
            $json = '{"ingredients" :[';
            foreach ($req as $obj){
                $json = $json.'{"id":"'.$obj.'"},';
            }
            $json = substr($json, 0 ,-1);
            $json = $json.']}';
            echo $json;
        } catch(PDOException $e){
            echo '{"error": {"text": '.$e->getMessage().'}';
        }

    });

$app->get('/recipes/ingredient/{id}', function(Request $request, Response $response){
    try{
        $id = $request->getAttribute('id');
        $db = new db();
        $db = $db->connect();
        $json = $db->select("ingredients",[
            "nazwa"
        ],[
            "id"=>$id
        ]);
        echo json_encode($json);
    }catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});