<?php namespace BSU\ISS\Events;

class Settings {

	public function __construct() {
		add_action( 'admin_menu', array( $this,  'eventsMenu' ) );
	}

	public function eventsMenu() {
		$display = new Controller();

		add_menu_page(
			"ISS Events",
			"ISS Events",
			"manage_options",
			"boise-state-iss-events-shortcode",
			array($display, 'shortcode')
		);
	}
}