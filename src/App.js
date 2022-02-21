import React, {useMemo, useState} from "react";
import './styles/app.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript', body:'Description'},
        {id: 2, title: 'fsdf', body:'fds1'},
        {id: 3, title: 'dasdadf', body:'aaaa43'},
        {id: 4, title: 'dsa23', body:'asddff44'},
    ])
    const [filter, setFilter] = useState({sort:'', query:''})
    const [modal, setModal] = useState(false)
    const sortedPosts = useMemo(()=> {
        if(filter.sort){
            return [...posts].sort((a,b)=> a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts;
    },[filter.sort,posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
    },[filter.query,sortedPosts]);

    const createPost =(newPost)=>{
        setPosts([...posts, newPost])
        setModal(false)
    }
    // получаем пост из дочернего компонента

    const removePost = (post)=>{
        setPosts(posts.filter(p => p.id !== post.id))
    }

  return (
    <div className="App">
        <MyButton style={{marginTop:'30px'}} onClick={()=> setModal(true)}>
            Создать пользавателя
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost} />
        </MyModal>

        <hr style={{margin:'15px 0'}}/>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        <PostList
            remove={removePost}
            posts={sortedAndSearchedPosts}
            title="Posts JS"
        />

    </div>
  );
}

export default App;