<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->put('/recipes', function(Request $request, Response $response){
    try {
        $body = json_decode($request->getBody());
        $db = new db();
        $db = $db->connect();
        $db->insert('recipes',[
            "nazwa" => $body->name,
            "opis"  => $body->description,
            "url"   => $body->url,
            "user_id" => $body->userId
        ]);
        echo '{"id":"'.$db->id().'"}';
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }

});
$app->get('/recipes/{id}', function(Request $request, Response $response){
    try {
        $userId = $request->getAttribute('id');
        $db = new db();
        $db = $db->connect();
        $json = $db->select("recipes",[
            "id",
            "nazwa",
            "url",
            "opis"
        ],[
            "user_id" => $userId
        ]);
        echo json_encode($json);



    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

$app->get('/fullRecipe/{id}', function(Request $request, Response $response){
    try {
        $recipeid = $request->getAttribute('id');
        $db = new db();
        $db = $db->connect();
        $json = $db->select("recipe_ingredient",[
                "ingredient_id",
                "ingredient_quantity",
            ],[
                "recipe_id" => $recipeid
        ]);

        echo json_encode($json);
} catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});
