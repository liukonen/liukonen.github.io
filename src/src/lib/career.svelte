<script>
	import Workplaces from './workplaces.svelte'
    import List from "./list.svelte"
    export let work
    export let highlights
</script>

<div class="container glass" id="career">
    <h3 class="text-center h3 tshadow mt-5">Career So far</h3>
    <div id="career2" class="mt-5">
        <Workplaces items={work} />
    <br />
    <h3 class="text-center h3 tshadow mt-5">highlights</h3>
    <List listItems={highlights} listStyle="1" />
    </div>
</div>