<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->put('/recipes/recipes_ingredient', function(Request $request, Response $response){
    try {
        $body = json_decode($request->getBody());
        $db = new db();
        $db = $db->connect();
        $db->insert('recipe_ingredient',[
            "ingredient_id"=>$body->ingredient_id,
            "ingredient_quantity"=>$body->ingredient_quantity,
            "recipe_id" => $body->recipe_id
        ]);
        echo '{}';
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
    });

