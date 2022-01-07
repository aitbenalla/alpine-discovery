document.addEventListener('alpine:init', () => {

    Alpine.data('tabs', (defaultTab) => ({
        tab: defaultTab,
        toggleTab(e) {
            this.tab = e.target.getAttribute('href').replace('#', '')
        },
        isActive(tab) {
            return tab === this.tab
        }
    }))

    Alpine.store('posts', {
        loading: false,
        posts: [],
        loaded: false,
        loadPosts() {
            if (this.loaded) {
                return;
            }
            this.loading = true,
                fetch('https://jsonplaceholder.typicode.com/posts?_limit=50')
                .then(r => r.json())
                .then(json => {
                    this.posts = json
                    this.loaded = true
                    this.loading = false
                })

        }
    })

    Alpine.data('posts', () => ({
        init() {
            this.$store.posts.loadPosts()
        }
    }))
})