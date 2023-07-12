<script>
    import Welcome from "./welcome.svelte"
    import List from "./list.svelte"

    export let greating
    export let InterestItems
    export let VolunteerItems
</script>

<div id="about">
    <Welcome greating={greating} />
    <div class="container glass">
        <div class="row">
            <div class="col-md-6">
                <h1 class="h3 tshadow">Interests</h1>
                <List listItems={InterestItems} listStyle="0" />
            </div>
            <div class="col-md-6">
                <h1 class="h3 tshadow">Volunteer</h1>
                <List listItems={VolunteerItems} listStyle="0" />
            </div>
        </div>
    </div>
</div>