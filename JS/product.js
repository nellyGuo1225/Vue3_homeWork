const { createApp } = Vue;
const url = "https://vue3-course-api.hexschool.io/v2";
const path = "nian-api";
const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
axios.defaults.headers.common['Authorization'] = token; 

if(token === "" || token === null){
    window.location.href="./login.html"
}

const app = createApp({
    data() {
        return {
            tempProduct: {},
            products: []
        }
    },
    methods: {
        getProducts() {
            axios.get(`${url}/api/${path}/admin/products`)
                .then((res) => {
                    console.log(res);
                    this.products = res.data.products;
                })
                .catch((error) => {
                    console.dir(error);
                    window.location.href="./login.html"
                })
        },
        checkLogin() {
            axios.post(`${url}/api/user/check`)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((error) => {
                    console.dir(error);
                    window.location.href="./login.html"
                })
        }
    },
    mounted() {
        this.checkLogin();
        this.getProducts();
    },
});

app.mount('#app');