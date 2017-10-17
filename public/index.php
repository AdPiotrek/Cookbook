<?php
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    require '../vendor/autoload.php';
    //$app object required
    require '../src/config/db.php';
    $app = new \Slim\App();
    // Customer routes
    require '../src/routes/users.php';
    require '../src/routes/ingredients.php';
    require '../src/routes/recipe.php';
    require '../src/routes/recipes_ingredients.php';


    $app->run();
?>