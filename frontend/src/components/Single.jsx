import { useState, useEffect } from 'react';
import edjsHTML from 'editorjs-html';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';

function Single() {
  const userId = useParams();
  const [post, setPost] = useState(null);
  const edjsParser = edjsHTML();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5050/api/v1/blog/view/${userId.id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data.body);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [userId]);

  if (post === null) {
    return <div>Loading...</div>;
  }
  const html = edjsParser.parse(post);
  
  return (
    <>
      <div style={{  width: "1100px", margin: "0 auto" }}>{parse(html.join(''))}</div>
    </>
  );
}

export default Single;