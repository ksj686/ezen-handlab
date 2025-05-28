import { useEffect, useState } from "react";

export default function useMemo38() {
    // input
    //json 데이터 저장하기
    const [value, setValue] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(posts => setPosts(posts))
    }, [])
    return (
        <>
            <input value={value} onChange={e => setValue(e.target.value)} />
            <A msg={value} posts={posts} />

        </>
    )
}