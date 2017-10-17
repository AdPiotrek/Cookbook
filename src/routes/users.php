<?php
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;
    $isEmail = null;
    // Get All Customers
    $app->put('/user/email', function(Request $request, Response $response){
        try{
            $email = $request->getParam("email");
            $db = new db();
            $db = $db->connect();
            if ($db->has('users',[
                "email" => $email
                ])
            ){
                echo  '{"isFree":"true"}';
            }else{
                echo  '{"isFree":"false"}';
            }
        } catch(PDOException $e){
            echo '{"error": {"text": '.$e->getMessage().'}';
        }

    });


  $app->put('/user', function(Request $request, Response $response) {
      try{

        $body = json_decode($request->getBody());
        $firstName = $body->firstName;
        $lastName = $body->lastName;
        $email = $body->email;
        $password = $body->password;

          $db = new db();
          $db = $db->connect();
          $db->insert("users",[
              "imie" => $firstName,
              "nazwisko" => $lastName,
              "email" => $email,
              "password" => $password
          ]);
          echo '{"id":"'.$db->id().'"}';
      } catch(PDOException $e){
          echo '{"error": {"text": '.$e->getMessage().'}';
      }
  });

$app->put('/checkUser', function(Request $request, Response $response){
    try{
        $body = json_decode($request->getBody());
        $email = $body->email;
        $password = $body->password;
        $db = new db();
        $db = $db->connect();
        if ($db->has('users',[
            "email" => $email,
            "password" => $password
        ])){
            echo  '{"isExist": "true"}';
        }else{
            echo  '{"isExist": "false"}';
        }
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }

});

$app->put('/loggedUser', function(Request $request, Response $response) {
    try {
        $body = json_decode($request->getBody());
        $email = $body->email;
        $db = new db();
        $db = $db->connect();
        $json = $db->select('users', [
            "id",
            "imie",
            "nazwisko",
            "email",
            "password"
        ], [
            "email" => $email
        ]);
        echo json_encode($json);
    } catch (PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}';
    }
});
    ?>