<script>
    export let value = false;
    export let readonly;
    export let disabled;
</script>

{#if value}
    <div class="field is-horizontal">
        <div class="field-label">
            <label class="label" for="edit-sink-options-{value._id}-event-name"
                >Событие для вызова</label
            >
        </div>
        <div class="field-body">
            <div class="field">
                <p class="control is-narrow">
                    <input
                        class="input is-success"
                        id="edit-sink-options-{value._id}-event-name"
                        type="text"
                        placeholder="module/event"
                        bind:value={value.eventName}
                        {readonly}
                        {disabled}
                    />
                </p>
            </div>
        </div>
    </div>
{/if}
