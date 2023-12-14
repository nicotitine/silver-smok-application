<script>
    import {page} from '$app/stores'
</script>

<div class="contact-full-page">
    <div class="contact-container">
        <div class="header">
            <h2>Error</h2>
        </div>
        <div class="content">{$page.status} {$page.error?.message}</div>

        <div class="contact-action-buttons">
            <div>
                <a class="underline-link" href="/">Return</a>
            </div>
        </div>
    </div>
</div>


<style>
    .header {
        padding-top: 30px;
        padding-bottom: 30px;
    }

    .content {
        padding: 30px;
    }
</style>