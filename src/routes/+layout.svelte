<script>
    import './styles.css'
    import github from '../lib/images/github.svg'
</script>

<div class="app">
    <main>
        <slot />
    </main>

    <footer>
        <a href="https://github.com/Sturlen/5e-character-builder/tree/main"
            >Github Repository <img src={github} alt="Github Logo" height="32px" /></a
        >
        <a href="https://github.com/Sturlen">Made by Sturlen</a>
    </footer>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
        background-color: rgba(0, 0, 0, 0.1);
    }

    footer a {
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }
</style>
