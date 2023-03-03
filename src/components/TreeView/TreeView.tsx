import Tree from '@naisutech/react-tree';
import React, { useState} from "react";
import TreeNode from './TreeNodeTypes';




function TreeView({nlpData}:{nlpData: TreeNode[]}) {

  
   


    return (
        <div className="treeView__wrapper">
        <Tree nodes={nlpData}
           noDataString=" "
           theme="light"
           containerStyle={{ backgroundColor: 'white' }}
        />
        </div >
        )
        
}
export default TreeView;