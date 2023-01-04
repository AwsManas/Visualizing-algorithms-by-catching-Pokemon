import * as Constants from '../constants'

var visited_in_order = [];
var shortestPath = [];
var openList = [];
var n;
var m;

function issafe(x,y,grid){
  if(x<0 || y<0 || x>=Constants.grid_height || y>= Constants.grid_width)
  return false;


  return true;
}

function minNodeFromList(list){
    let minn = Infinity;
    let ret ;

    for (let node of list ){
        if(node.f <= minn){
            minn = node.f;
            ret = node;
        }
    }

    return ret;

}

function isUnblocked(grid,r,c){
    if(grid[r][c].isWall===Infinity)
    return false;
    return true;
}


function calculateH(r,c,last_node){
    return Math.sqrt((r- last_node.row)**2 + (c-last_node.col)**2 );
}

export function a_star(grid, startNode, finishNode) {
    visited_in_order = [];
    shortestPath = []
    openList = []
    n = grid.length;
    m = grid[0].length;
    var parents = new Array(n).fill(null).map(()=>new Array(m).fill(-1));
    var f_g_h = new Array(n).fill(null).map(()=>new Array(m).fill({f : Infinity , g : Infinity , h : Infinity}));
    var closed_list = new Array(n).fill(null).map(()=>new Array(m).fill(false));
    const delx = [1,0,-1,0];
    const dely = [0,1,0,-1];

    let r = startNode.row;
    let c = startNode.col;
    let temp_obj = {
        row : r,
        col : c
    };
    parents[r][c] = temp_obj;

    f_g_h[r][c] = { f : 0, g:0 , h:0};

    // f, row, col 
    openList.push({f : 0 , row : r, col : c});
    var found_dest = false;

    while(openList.length!== 0){

        let min_node = minNodeFromList(openList);
        const index = openList.indexOf(min_node);
        openList.splice(index, 1);
        visited_in_order.push(min_node);
        closed_list[min_node.row][min_node.col] = true;

        let gnew, fnew , hnew 
        let r = min_node.row;
        let c = min_node.col;
        for(let i=0; i<4; i++){
            let rnew = r+delx[i];
            let cnew = c+dely[i];
            if(issafe(rnew,cnew,grid)){
                if(rnew === finishNode.row && cnew === finishNode.col){
                    found_dest = true;
                    parents[rnew][cnew] = min_node;
                    break;
                }

                else if( closed_list[rnew][cnew] === false && isUnblocked(grid,rnew,cnew) === true ){
                    let offset = grid[rnew][cnew].isWall;
                    offset = offset === 0 ? 1 : offset;
                    gnew = f_g_h[r][c].g + offset;
                    hnew = calculateH(rnew,cnew,finishNode);
                    fnew = gnew + hnew;

                    if(f_g_h[rnew][cnew].f === Infinity|| f_g_h[rnew][cnew] > fnew){
                        openList.push({f : fnew , row : rnew , col : cnew});
                        let temp_cell = {f : fnew , g : gnew , h : hnew};
                        f_g_h[rnew][cnew] = temp_cell;
                        parents[rnew][cnew] = min_node;
                    }
                }
            }

        }
        if(found_dest === true){
            break;
        }
    
    }

    // i should have answer by now
    
    if(found_dest === true) {
        // a sucessfull path exists 
        const last_ele  = visited_in_order[visited_in_order.length-1];
        var temp_node = JSON.parse(JSON.stringify(last_ele));
        while(temp_node.col!== startNode.col || temp_node.row !== startNode.row){
            shortestPath.push(temp_node);
            temp_node = parents[temp_node.row][temp_node.col]
        }
        shortestPath.push(temp_node);
        shortestPath.reverse();
    }
    
    return [visited_in_order , shortestPath];

}
    