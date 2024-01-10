<script lang="ts">
    import tippy, { type Props } from "tippy.js"
    import 'tippy.js/dist/tippy.css';

    let content = "Tooltip";

    type Options = Partial<Props>

    function tooltip(element: HTMLElement, options: Options){
        const tooltip = tippy(element, options);

        return {
            update(options:Options){
                tooltip.setProps(options)
            },
            destroy() {
                tooltip.destroy()
            }
        }
    }
</script>

<div style="margin-top: 10rem;">
    
    <input bind:value={content} />

    <button use:tooltip={{content}}>Hover</button>
</div>