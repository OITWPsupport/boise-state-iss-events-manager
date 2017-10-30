<?php
/*
Plugin Name: Boise State ISS Events Manager
Description: Plugin for adding and viewing Google Calendar events
Version: 1.0.0
Author: Boise State Student Affairs Web Team
 */

require_once('plugin/Data.php');
require_once('plugin/Controller.php');
require_once('plugin/Settings.php');

add_shortcode('iss_events_manager', 'getISSEventsManagerView');

if(is_admin()) {
    new  BSU\ISS\Events\Settings();
}

function getISSEventsManagerView($params)
{
    $controller = new  BSU\ISS\Events\Controller();
    return $controller->display(
        issEventsSafeParameter($params, 'categories'),
        issEventsSafeParameter($params, 'view'),
        issEventsSafeParameter($_GET, 'cal'),
        issEventsSafeParameter($_GET, 'id')
    );
}

function issEventsSafeParameter($params, $id)
{
    return isset($params[$id]) ? $params[$id] : null;
}