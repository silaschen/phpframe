<?php
include_once "config/smarty-3.1.29/libs/Smarty.class.php";
define("SMARTY_TEMPLATE_PATH", "smarty/app");
define("SMARTY_COMPILE_PATH", "smarty/compile");
define("SMARTY_CACHE_PATH", "smarty/cache");
global $smarty;
$smarty = new Smarty();
$smarty->setTemplateDir(SMARTY_TEMPLATE_PATH);
$smarty->setCacheDir(SMARTY_CACHE_PATH);
$smarty->setCompileDir(SMARTY_COMPILE_PATH);
