const url = {
    home: { path: '/', name: 'home', meta: { title: '首頁' } },
    dialog: { path: '/dialog', name: 'dialog', meta: { title: '對話框' } },
    carousel: { path: '/carousel', name: 'carousel', meta: { title: '輪播' } },
    picker: { path: '/picker', name: 'picker', meta: { title: '日期選擇器' } },

    unauthorized: { path: '/unauthorized', name: 'unauthorized', meta: { title: '無瀏覽權限' } },
    notFound: { path: '/:pathMatch(.*)*', name: 'notFound', meta: { title: 'ˋ404' } },
}

export default url;