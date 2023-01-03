import React , {Component} from "react";

import Node from './SingleNode.js'
import Mouse_Weight from './MouseWeight.js';
import './css/MyApp.css'
import * as Constants from './constants'

import {depth_first_search} from './algorithms/dfs'
import {breadth_first_search} from './algorithms/bfs'
import {dijiktras_path} from './algorithms/dijiktras'

export default class MyApp extends Component{

    constructor(props){
        super(props)
        this.state = {
            nodes : [],
            mouse_weight : 1
        } 
    }

    componentDidMount() {
        const nodes = initialNodes();
        this.setState({nodes});
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
    render(){

        let nodes = this.state.nodes;
        let mouse_weight = this.state.mouse_weight;
        return (
            <div>
            <button onClick={ () => this.visualize_dfs()}>DFS</button>
            <button onClick= { () => this.visualize_bfs()}>BFS</button>
            <button onClick= { () => this.visualize_dijiktras()}>Dijiktras</button>
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
                isWall : false,
                shortestPath : false
            };

            crow.push(thisNode);

        } 
        nodes.push(crow);
    }
    return nodes;
};