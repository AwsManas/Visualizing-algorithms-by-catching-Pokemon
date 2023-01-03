import * as Constants from '../constants'

var visited_in_order = [];
var glb_startNode = 0;
var glb_endNode = 0;
var parents = []
var shortestPath = []
// return shortes path 

export function breadth_first_search(grid , startNode , endNode) {
    visited_in_order = [];
    shortestPath = [];
    glb_endNode = endNode;
    glb_startNode = startNode;
    parents = JSON.parse(JSON.stringify(grid));
    bfs(startNode.row,startNode.col,grid);
    const last_ele  = visited_in_order[visited_in_order.length-1];
    if(last_ele.row === endNode.row && last_ele.col === endNode.col) {
        // a sucessfull path exists 
        var temp_node = JSON.parse(JSON.stringify(last_ele))
        while(temp_node.col!== startNode.col || temp_node.row !== startNode.row){
            shortestPath.push(temp_node);
            temp_node = parents[temp_node.row][temp_node.col]
        }
        shortestPath.push(temp_node);
    }
    shortestPath.reverse();
    return [visited_in_order , shortestPath];
}


function issafe(x,y,grid){
    if(x<0 || y<0 || x>=Constants.grid_height || y>= Constants.grid_width)
    return false;

    if(grid[x][y].isWall)
    return false;

    return true;
}

function bfs(r,c,grid){

    let queue = [];
    let completed = false;

    const delx = [1,0,-1,0];
    const dely = [0,1,0,-1];

    let nodeObj = {
        row : r,
        col : c 
    }

    parents[r][c] = -1;
    queue.push(nodeObj);
    visited_in_order.push(nodeObj);

    while(queue.length!== 0) {
        const node = queue.shift();

        for (let i=0; i<4; i++){
            let temp_obj = {
                row : node.row+delx[i],
                col : node.col+dely[i]
            }
            if( !completed &&issafe(node.row+delx[i],node.col+dely[i],grid) ){
                if(!visited_in_order.some(el => el.row === node.row+delx[i] && el.col === node.col + dely[i]))
                {
                    parents[node.row+delx[i]][node.col + dely[i]] = node;
                    queue.push(temp_obj);
                    visited_in_order.push(temp_obj);
                    if(temp_obj.row===glb_endNode.row && temp_obj.col===glb_endNode.col){
                        completed = true;
                    }
                    
                }
            }
        }

    }

    return visited_in_order;

}