<script lang="ts">
    let checked = false;

    let value = "";

    function greet(element: HTMLElement, value: string){

        const greetEvent = new CustomEvent("greet", {detail: "nope"});
        element.dispatchEvent(greetEvent)

        element.animate([{
            opacity: 0,
        }, {
            opacity: 1
        }], {
            duration:2000,
            fill: "forwards"
        })

        return {
            update(value: string){
                console.log({value}) 
            },
            destroy() {
                console.log("bey")
            }
        }
    }

    function handleGreet(event: CustomEvent){console.log("hid",event.detail);}


</script>

<label>
    <input type="checkbox" bind:checked>
    Toggle
</label>

{#if checked}
    <input type="text" bind:value>
    <div on:greet={handleGreet} use:greet={value} >Action</div>
{/if}