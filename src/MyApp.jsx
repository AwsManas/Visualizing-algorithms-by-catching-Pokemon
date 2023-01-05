import React , {Component} from "react";

import Node from './SingleNode.js'
import Mouse_Weight from './MouseWeight.js';
import Card from './Card.js';
import Header from './Header';
import './css/MyApp.css'
import * as Constants from './constants'

import {depth_first_search} from './algorithms/dfs'
import {breadth_first_search} from './algorithms/bfs'
import {dijiktras_path} from './algorithms/dijiktras'
import { a_star } from "./algorithms/a_star.js";

export default class MyApp extends Component{

    constructor(props){
        super(props)
        this.state = {
            nodes : [],
            mouse_weight : 1,
            algorithm : 'None'
        } 
    }

    componentDidMount() {
        const nodes = initialNodes();
        this.setState({nodes});
        const div = document.querySelector('#top');
        div.scrollIntoView({ behavior: 'smooth' });
    }

    animate_dfs(visited_nodes){
        let  delay = 20;
        for(const node of visited_nodes){
            delay +=50;
            setTimeout(()=> {
            const newNodes = this.state.nodes.slice();
            const newNode = {
                ...node,
                visit : true
            }
            newNodes[node.row][node.col] = newNode;
            this.setState({nodes: newNodes});
            },10+delay);
        }

    }

    animate_shortest_path(visited_nodes,path){
        let  delay = 20;
        for(const node of visited_nodes){
            delay +=50;
            setTimeout(()=> {
            const newNodes = this.state.nodes.slice();
            const newNode = {
                ...node,
                visit : true
            }
            newNodes[node.row][node.col] = newNode;
            this.setState({nodes: newNodes});
            },10+delay);
        }

        for(const node of path){
            delay+=50;
            setTimeout(()=>{
                const newNodes = this.state.nodes.slice();
                const newNode = {
                    ...node,
                    shortestPath : true
                }
                newNodes[node.row][node.col] = newNode;
                this.setState({nodes : newNodes});
            },10+delay);
        }
    }

    visualize_dfs() {
    const {nodes} = this.state;
    const startNode = nodes[Constants.start_row][Constants.start_col];
    const finishNode = nodes[Constants.end_row][Constants.end_col];
    const visitedNodesInOrder = depth_first_search(nodes, startNode, finishNode);
    visitedNodesInOrder.shift(); // Remove the starting element
    const last_ele = visitedNodesInOrder.pop();
    if(!(last_ele.col === finishNode.col && last_ele.row === finishNode.row)){
        visitedNodesInOrder.push(last_ele);
    } 
    this.animate_dfs(visitedNodesInOrder);
    }

    visualize_bfs() {
    const {nodes} = this.state;
    const startNode = nodes[Constants.start_row][Constants.start_col];
    const finishNode = nodes[Constants.end_row][Constants.end_col];
    const [visitedNodesInOrder , shortestPath ]= breadth_first_search(nodes, startNode, finishNode);
    visitedNodesInOrder.shift(); // Remove the starting element
    const last_ele = visitedNodesInOrder.pop();
    if(!(last_ele.col === finishNode.col && last_ele.row === finishNode.row)) {
        visitedNodesInOrder.push(last_ele);
    } 
    this.animate_shortest_path(visitedNodesInOrder,shortestPath);
    }

    visualize_dijiktras(){
    const {nodes} = this.state;
    const startNode = nodes[Constants.start_row][Constants.start_col];
    const finishNode = nodes[Constants.end_row][Constants.end_col];
    const [visitedNodesInOrder, shortestPathInOrder] = dijiktras_path(nodes,startNode,finishNode);
    const last_ele = visitedNodesInOrder.pop();
    visitedNodesInOrder.shift();
    if(!(last_ele.col === finishNode.col && last_ele.row === finishNode.row)) {
        visitedNodesInOrder.push(last_ele);
    } 
    this.animate_shortest_path(visitedNodesInOrder,shortestPathInOrder);
    }

    visualize_a_star(){
    const {nodes} = this.state;
    const startNode = nodes[Constants.start_row][Constants.start_col];
    const finishNode = nodes[Constants.end_row][Constants.end_col];
    const [visitedNodesInOrder, shortestPathInOrder] = a_star(nodes,startNode,finishNode);
    const last_ele = visitedNodesInOrder.pop();
    visitedNodesInOrder.shift();
    if(!(last_ele.col === finishNode.col && last_ele.row === finishNode.row)) {
        visitedNodesInOrder.push(last_ele);
    } 
    this.animate_shortest_path(visitedNodesInOrder,shortestPathInOrder);
    }

    handleMouseDown(row,col){
        const newNodes = getNewNodesWithWallToggle(this.state.nodes,row,col,this.state.mouse_weight)
        this.setState({nodes : newNodes , mousePressed : true});
    }

    handleMouseUp(){
        this.setState({mousePressed : false});
    }

    handleMouseEnter(row,col){
        if(this.state.mousePressed===false)
        return;
        const newNodes = getNewNodesWithWallToggle(this.state.nodes,row,col,this.state.mouse_weight)
        this.setState({nodes : newNodes});
    }

    toggleMouseBehavious(){
        let mouse_weight = this.state.mouse_weight;
        mouse_weight = (mouse_weight + 1 )% (Constants.max_weight + 1) ;
        mouse_weight = mouse_weight < 1 ? 1 : mouse_weight;
        this.setState({mouse_weight : mouse_weight});
    }

    eraseWeightsMode(){
        let mouse_weight = 0;
        this.setState({mouse_weight : mouse_weight});
    }


    setAlgorithmType(ch){
        this.setState({algorithm : ch});
        const div = document.querySelector('#choose_map');
        div.scrollIntoView({ behavior: 'smooth' });

    }
    render(){

        let nodes = this.state.nodes;
        let mouse_weight = this.state.mouse_weight;
        return (
            <div id="top">
            <Header></Header>
            <br />
            <div className="section-heading">Choose the Ball (traversing algorithm) you want to visualize</div>
            <div className="card_wrapper">
            <Card 
            url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9sJmuEuOG686oVIqaxsLDjwa0qs_cNB5xnw&usqp=CAU'
            title = 'Poke Ball'
            description = 'It uses DFS technique for traversal. It does not Guarantee the shortest path and deosnt work for weighted edges.'
            algorithm = 'DFS'
            callback = {(ch) => this.setAlgorithmType(ch) }
            hypertext = 'Link'
            hyperlink = 'https://en.wikipedia.org/wiki/Depth-first_search'
            ></Card>
            <Card 
            url = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/016cd9a5-7bee-44c1-b903-9a4867cfd9ea/d86ar2c-a7240aef-1530-41d5-9965-a9355c888a2f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAxNmNkOWE1LTdiZWUtNDRjMS1iOTAzLTlhNDg2N2NmZDllYVwvZDg2YXIyYy1hNzI0MGFlZi0xNTMwLTQxZDUtOTk2NS1hOTM1NWM4ODhhMmYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.40NfNjKM6aL2B5uPDrsL5c9_o-WjD1q0PLkARAM0Wm0'
            title = 'Great Ball'
            description = 'It uses BFS technique for traversal. It reaches the target in the shortest path however works correctly only for unweighted graph.'
            algorithm = 'BFS'
            callback = {(ch) => this.setAlgorithmType(ch) }
            hypertext = 'Link'
            hyperlink = 'https://en.wikipedia.org/wiki/Breadth-first_search'
            ></Card>
            <Card 
            url = 'https://www.pngitem.com/pimgs/m/246-2466153_transparent-ultraball-png-ultra-ball-png-hd-png.png'
            title = "Ultra Ball"
            description = "It uses the famous gready Dijkstra's algorithm to find the shortest path. It can even find the shortest path for weighted componenets."
            algorithm = 'Dijiktras'
            callback = {(ch) => this.setAlgorithmType(ch) }
            hypertext = 'Link'
            hyperlink = 'https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm'
            ></Card>
            <Card 
            url = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c861d306-8f42-4864-ab2e-61a271518c8a/df5v8as-456a4efd-1d86-4e1b-a9ff-0f85538d8625.png/v1/fill/w_1280,h_1281,strp/master_ball__pokemon_pinball__by_ace_zeroartic_df5v8as-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MSIsInBhdGgiOiJcL2ZcL2M4NjFkMzA2LThmNDItNDg2NC1hYjJlLTYxYTI3MTUxOGM4YVwvZGY1djhhcy00NTZhNGVmZC0xZDg2LTRlMWItYTlmZi0wZjg1NTM4ZDg2MjUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.4ReIMhNfZXOSG2g_LsoY3DQGUsRkeuziEkC4PvfF9QI'
             title = "Master Ball"
            description = 'Master Ball uses A* search algorithm that guarntees to find the shortest path in least amount of time in comparision to other algorithms.'
            algorithm = 'a_Star'
            callback = {(ch) => this.setAlgorithmType(ch) }
            hypertext = 'Link'
            hyperlink = 'https://en.wikipedia.org/wiki/A*_search_algorithm'
            ></Card>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br id = "choose_map"/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="section-heading">Choose the map template</div>
            <br/>
            <div className="card_wrapper">
            <Card
                url = 'https://github.com/AwsManas/Visualizing-algorithms-by-catching-Pokemon/blob/master/src/media/dense.png?raw=true'
                title = 'Dense Map'
                description = 'Randomly generate a dense map with lots of walls and weights'
            >   
            </Card>
            <Card
                url = 'https://github.com/AwsManas/Visualizing-algorithms-by-catching-Pokemon/blob/master/src/media/empty.png?raw=true'
                title = 'Empty Map'
                description = 'Show your creativity and draw your own map that suits your style'
            >   
            </Card>
            <Card
                url = 'https://github.com/AwsManas/Visualizing-algorithms-by-catching-Pokemon/blob/master/src/media/shallow.png?raw=true'
                title = 'Shallow Map'
                description = 'Randomly generate a shallow map with less number of wall and weights'
            >   
            </Card>
            </div>
            <button onClick={ () => this.visualize_dfs()}>DFS</button>
            <button onClick= { () => this.visualize_bfs()}>BFS</button>
            <button onClick= { () => this.visualize_dijiktras()}>Dijiktras</button>
            <button onClick= { () => this.visualize_a_star()}>A*</button>
            <button onClick = {() => {this.toggleMouseBehavious()}}>Change Weights</button>
            <button onClick = {() => {this.eraseWeightsMode()}}>Eraser</button>
            <Mouse_Weight weight = {mouse_weight}></Mouse_Weight>
            <div className="mygrid">
            {nodes.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {start,finish,visit,isWall,row,col,shortestPath} = node;
                    return (
                      <Node 
                        key = {nodeIdx}
                        isStart = {start} 
                        isEnd = {finish}
                        isVisited = {visit}
                        isWall = {isWall}
                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                        onMouseUp={() => this.handleMouseUp()}
                        row = {row}
                        col = {col}
                        isShort = {shortestPath}
                        >
                      </Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
          </div>
        )
    }

}

const getNewNodesWithWallToggle = (nodes,row,col,weight) => {
    const newNodes = nodes.slice();
    const node = newNodes[row][col];
    weight = weight === 1 ? Infinity : weight;
    const newNode = {
            ...node,
            isWall : weight
    }
    newNodes[row][col] = newNode;
    return newNodes;
};

const initialNodes = () => {
    let nodes = []
    for(let row = 0; row < Constants.grid_height; row++){
        let crow = []; 
        for(let col = 0; col < Constants.grid_width; col++) {
            
            let thisNode = {
                row : row,
                col : col,
                start : row === Constants.start_row && col === Constants.start_col , 
                finish : row === Constants.end_row && col === Constants.end_col,
                visit : false,
                isWall : 0,
                shortestPath : false
            };

            crow.push(thisNode);

        } 
        nodes.push(crow);
    }
    return nodes;
};

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  