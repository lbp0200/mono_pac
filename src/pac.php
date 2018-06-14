<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SERVER['HTTP_PWD']) && $_SERVER['HTTP_PWD'] === '123') {
    file_put_contents('../tmp/tmp.pac', file_get_contents('php://input'));
//    echo file_get_contents('../tmp/tmp.pac');
    exit('ok');
}
if ((!isset($_GET['a']) || empty($_GET['a'])) || (!isset($_GET['b']) || empty($_GET['b']))) {
    http_response_code(400);
    echo "parameter a and b must be set. url demo:http://localhost/pac.php?a=SOCKS5&b=192.168.1.1:1080";
    exit();
}

header('Content-type: text/javascript');
echo sprintf(file_get_contents('../tmp/tmp.pac'), $_GET['a'], $_GET['b']);