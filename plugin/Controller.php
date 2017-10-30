<?php namespace BSU\ISS\Events;

class Controller {

	protected $categories;
	protected $data;

	public function __construct()
	{
		$this->data = new Data();
		$this->categories = $this->data->getCategories();
	}

	public function shortcode() {
		echo $this->data->getEvaledFile(__DIR__ . '/../templates/plugin/shortcode.php', array(
			'id' => $this->data->randomId(),
			'dashboard' => $this->data->getFilePath('dashboard', 'js'),
			'params' => htmlentities( json_encode( array(
				'categories' => array(
					'all' => $this->categories
				)
			) ) )
		));
	}

	public function manager() {
		echo $this->data->getEvaledFile( __DIR__ . '/../templates/plugin/manager.php', array(
			'id' => $this->data->randomId(),
			'dashboard' => $this->data->getFilePath('dashboard', 'js'),
			'params' => htmlentities( json_encode( array(
				'categories' => array(
					'all' => $this->categories
				)
			) ) )
		) );
	}

	public function display( $categories, $viewType, $calendarId = null, $eventId = null ) {
		return $this->data->getEvaledFile( __DIR__ . '/../templates/plugin/display.php', array(
			'display' => $this->data->getFilePath('display', 'js'),
			'id'       => $this->data->randomId(),
			'viewType' => $viewType,
			'params'   => htmlentities( json_encode( array(
				'categories'  => array(
					'view' => $categories ?: array(),
					'all'  => $this->categories,
				),
				// Used for details page
				'calendarId'  => $calendarId,
				'eventId'     => $eventId
			) ) )
		) );
	}

}