import React, { useState} from "react";
import './styles/app.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort:'', query:''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)


    const createPost =(newPost)=>{
        setPosts([...posts, newPost])
        setModal(false)
    }

    async function fetchPosts(){
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(response.data)
    }

    // получаем пост из дочернего компонента

    const removePost = (post)=>{
        setPosts(posts.filter(p => p.id !== post.id))
    }

  return (
    <div className="App">
        <button onClick={fetchPosts}> GET POSTS</button>
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
