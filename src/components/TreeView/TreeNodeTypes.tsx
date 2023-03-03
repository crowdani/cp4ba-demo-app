

export interface Item {
    id: string;
    parentId: string | null;
    label: string;
}

export default interface TreeNode {
    id: string;
    parentId: string | null;
    label: string;
    items: Item[];
}

