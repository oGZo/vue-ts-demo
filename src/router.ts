import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const getComp = (ph:string) => {
    return () => import(`./${ph}.vue`);
};

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'a',
        component: getComp('components/a')
    },
    {
        path: '/b',
        name: 'b',
        component: getComp('components/b'),
        children: [
                {
                    path: 'c',
                    name: 'bc',
                    component: getComp('components/c'),
                }
        ]
    },
]
export default new VueRouter({
    routes,
})

