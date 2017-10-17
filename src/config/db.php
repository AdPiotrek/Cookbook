<?php

    use Medoo\Medoo;

   class db {
       function connect() {
           return new Medoo([
               'database_type' => 'mysql',
               'database_name' => 'cookbook',
               'server' => 'localhost',
               'username' => 'root',
               'password' => ''
           ]);
       }
   }


?>