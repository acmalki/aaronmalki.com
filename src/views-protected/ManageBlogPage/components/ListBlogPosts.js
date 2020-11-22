import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../../context";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import BlogPostItem from "./BlogPostItem";
import {blog_categories, blog_states} from "../../../constants/contants";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import UploadBlog from "./UploadBlog";
import {colorScheme} from "../../../constants";
import OptionsSelect from "./OptionSelect";
import deleteBlogPostFromDb from "../../../components/Database/deleteBlogPostFromDb";
import isObjectEmpty from "../../../components/Utility/isObjectEmpty";
import editBlogPostState from "../../../components/Database/editBlogPostState";


const useStyles = makeStyles((theme) => ({
    table: {
        display: "flex", flexGrow: 1, margin: theme.spacing(2), borderRadius: 6
    }
}));

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: 'transparent',

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : colorScheme.other.backgroundComplementary,
    padding: grid,
    width: 346,
    overflowY: "auto",
    border: '5 solid green',
    height: '75vh',
    borderRadius: 2,
    margin: 0,
    marginTop: 5,
    marginBottom: 5,

});

const COLUMNS_NAMES = [blog_states.main_featured, blog_states.featured, blog_states.posts];
const COLUMN_COLORS = [colorScheme.general.shabby_chic, colorScheme.general.other_blue, colorScheme.general.dark_purple]
const TableHeader = ({colIdx,category}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h6" color="textSecondary" component="h6">{COLUMNS_NAMES[colIdx]}</Typography>
            <Divider style={{margin: 5}}/>
            <UploadBlog initialCategory={category} blogState={COLUMNS_NAMES[colIdx]} color={COLUMN_COLORS[colIdx]}/>
        </div>
    )
};
//export const blog_states = {
// featured: "featured",
//    posts: "posts",
//  main_featured: "main_featured"

//BlogPostItem { post,path }

/**
 *
 * @param blogPosts
 * @param blogStateIdx
 * @param category
 * @return {{post, key: *}[]}
 * @private
 */
const _getPosts = (blogPosts, blogStateIdx, category = 'all') => {
    return Object.keys(blogPosts[COLUMNS_NAMES[blogStateIdx]]).map((key) => {
        return {post: {...blogPosts[COLUMNS_NAMES[blogStateIdx]][key]}, key}
    }).filter((aPost) => {
        return category === 'all' || aPost.post.category === category;
    })
};

const getListArrayFromPosts = (blogPosts, category = 'all') => {
    let post_array = [[], [], []];

    if (COLUMNS_NAMES[0] in blogPosts) {
        post_array[0] = _getPosts(blogPosts, 0, category)
    }

    if (COLUMNS_NAMES[1] in blogPosts) {
        post_array[1] = _getPosts(blogPosts, 1, category)

    }

    if (COLUMNS_NAMES[2] in blogPosts) {
        post_array[2] = _getPosts(blogPosts, 2, category)
    }

    return post_array;
};

const getPosts = (category,filteredBlogPosts)=>{
    let featured,main_featured, posts;
    if (category&&!isObjectEmpty(filteredBlogPosts)&&filteredBlogPosts[category]){
        featured = filteredBlogPosts[category][blog_states.featured];
        main_featured = filteredBlogPosts[category][blog_states.main_featured];
        posts = filteredBlogPosts[category][blog_states.posts];
    }else{
        featured={};
        main_featured={};
        posts={};
    }
    return {featured,main_featured, posts}
};



/**
 * All based on https://codesandbox.io/s/-w5szl?file=/src/index.js:2799-2802
 * @return {*}
 * @constructor
 */
function ListBlogPosts() {
    const classes = useStyles();
    const {isBlogLoaded, blogPaths,filterPostToBlogState,blogPostsRaw} = useContext(AppContext);
    const [category, setCategory] = useState(blog_categories.news);
    const [state, setState] = useState(getListArrayFromPosts(filterPostToBlogState(blogPostsRaw,blog_categories.news)));



    // Subscribe to blogPosts and update the state anytime it happens
    useEffect(()=>{
        setState(getListArrayFromPosts(filterPostToBlogState(blogPostsRaw,category)))
    },[category,blogPostsRaw]);

    const deletePostCallback = (topLvlIndex, index,key) => ()=>{
        const newState = [...state];
        newState[topLvlIndex].splice(index, 1);
        setState(newState);
        deleteBlogPostFromDb(key)

    };

    

    function onDragEnd(result) {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {

            const result = move(state[sInd], state[dInd], source, destination);

            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];


            //editBlogPostState()
            setState(newState);
            editBlogPostState(newState[dInd][destination.index].key,{state:COLUMNS_NAMES[dInd]}).catch(e=>alert(`[editBlogPostState] firebase to failed update state: ${e}`))
        }
    }

    // Adding a column just add a blank entry to array
    return (
        <div>


            {/*<button
                type="button"
                onClick={() => {
                    setState([...state, []]);
                }}
            >
                Add new group
            </button>
            <button
                type="button"
                onClick={() => {
                    setState([...state, getItems(1)]);
                }}
            >
                Add new item
            </button>*/}
            <div style={{
                border: '0.5px solid rgba(255,255,255,.5)',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around'
            }}>

                <div style={{display: 'flex', width: 400}}>
                    <Typography variant="h5" color="textPrimary"  style={{alignSelf: 'center'}}>Blog
                        Category Shown: {category}</Typography>
                </div>

                <OptionsSelect style={{alignSelf: 'flex-end', justifySelf: 'flex-end'}} initial={category}
                               helperText={'Category'} label={"Filter blog category"}
                               choices={blog_categories}
                               onChoiceCallback={setCategory}/>
            </div>
            <Divider/>
            <div className={classes.table}>

                <DragDropContext onDragEnd={onDragEnd}>
                    {state.map((el, ind) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <TableHeader colIdx={ind} category={category}/>
                            <Droppable key={ind} droppableId={`${ind}`}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={{...getListStyle(snapshot.isDraggingOver)}}
                                        {...provided.droppableProps}
                                    >
                                        {el.map((item, index) => (
                                            <Draggable
                                                key={item.key}
                                                draggableId={item.key}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                    >
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-around"
                                                            }}
                                                        >

                                                            <BlogPostItem key={`##${item.key}##`} deleteCallback={deletePostCallback(ind,index,item.key)} post={item.post} path={blogPaths[item.key]} postUUID={item.key} />

                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
}


export default ListBlogPosts;