<div
	ng-controller="MainCtrl"
	id="<?= $id; ?>"
	class="BsuEventsDisplay"
	ng-init="init('<?= $params ; ?>')"
	ng-cloak>

	<div ng-controller="EventsCtrl">
		<<?= $viewType ?>-view></<?= $viewType ?>-view>
	</div>
</div>

<?= $this->includes($id); ?>

<script src="<?= $display; ?>" onload="initBsuEventsApp('eventsApp')"></script>