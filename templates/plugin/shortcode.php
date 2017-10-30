<?= $this->includes($id); ?>

<h2>Bsu Events Manager Shortcode Creator</h2>

<div
	ng-controller="MainCtrl"
	id="<?= $id; ?>"
	ng-init="init('<?= $params ; ?>')"
	ng-cloak>

	<shortcode-form></shortcode-form>

</div>

<script src="<?= $dashboard; ?>" onload="initBsuEventsApp('eventsAdminApp')"></script>