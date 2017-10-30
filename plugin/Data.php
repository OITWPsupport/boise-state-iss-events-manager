<?php namespace BSU\ISS\Events;

class Data {
	protected $config;
	protected $rootDirectory;

	public function __construct() {
		$this->config = json_decode( file_get_contents( __DIR__ . '/../config.json' ) );
	}

	public function getCategories() {
		$parentCategories = array();
		foreach ( $this->config->calendars as $calendar ) {
			if ( $calendar->visible === false ) {
				continue;
			}
			$parentCategories[] = $calendar->name;
		}
		$categories = array();
		foreach ( $parentCategories as $name ) {
			// Get category
			$category = get_term_by( 'name', $name, 'category' );
			if ( ! is_object( $category ) ) {
				continue;
			}
			// Get subcategories
			$subcategories = get_categories( array(
				'child_of'   => $category->term_id,
				'hide_empty' => false
			) );
			// Add all to categories array
			$children = array();
			foreach ( $subcategories as $subcategory ) {
				$children[] = $subcategory->name;
			}
			$categories[] = array(
				'name'     => $category->name,
				'children' => $children
			);
		}

		return $categories;
	}

	public function getFilePath( $name, $type ) {
		$manifest = json_decode( file_get_contents( __DIR__ . '/../app/revs/' . $name . '-rev.json' ) );

		return site_url() . '/wp-content/plugins/iss_events_manager/app/' . $manifest->{$name . '.' . $type};
	}

	public function getEvaledFile( $filename, $data = array() ) {
		ob_start();
		extract( $data );
		include( $filename );
		$file = ob_get_contents();
		ob_end_clean();

		return $file;
	}

	// Called in views
	public function includes( $id ) {
		return $this->getEvaledFile( __DIR__ . '/../templates/plugin/includes.php', array(
			'id'           => $id,
			'css'          => $this->getFilePath( 'style', 'css' ),
			'dependencies' => $this->getFilePath( 'dependencies', 'js' )
		) );
	}

	// Used to allow us to bootstrap our angular app multiple times
	public function randomId() {
		$pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$id   = '';
		for ( $i = 0; $i < 19; $i ++ ) {
			$id .= $pool[ rand( 0, strlen( $pool ) - 1 ) ];
		}

		return $id;
	}

}