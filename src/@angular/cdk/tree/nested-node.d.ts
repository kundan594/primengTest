/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterContentInit, DoCheck, ElementRef, IterableDiffers, OnDestroy, OnInit, QueryList } from '@angular/core';
import { CdkTreeNodeOutlet } from './outlet';
import { CdkTree, CdkTreeNode } from './tree';
/**
 * Nested node is a child of `<cdk-tree>`. It works with nested tree.
 * By using `cdk-nested-tree-node` component in tree node template, children of the parent node will
 * be added in the `cdkTreeNodeOutlet` in tree node template.
 * The children of node will be automatically added to `cdkTreeNodeOutlet`.
 */
import * as ɵngcc0 from '@angular/core';
export declare class CdkNestedTreeNode<T, K = T> extends CdkTreeNode<T, K> implements AfterContentInit, DoCheck, OnDestroy, OnInit {
    protected _elementRef: ElementRef<HTMLElement>;
    protected _tree: CdkTree<T, K>;
    protected _differs: IterableDiffers;
    /** Differ used to find the changes in the data provided by the data source. */
    private _dataDiffer;
    /** The children data dataNodes of current node. They will be placed in `CdkTreeNodeOutlet`. */
    protected _children: T[];
    /** The children node placeholder. */
    nodeOutlet: QueryList<CdkTreeNodeOutlet>;
    constructor(_elementRef: ElementRef<HTMLElement>, _tree: CdkTree<T, K>, _differs: IterableDiffers);
    ngAfterContentInit(): void;
    ngOnInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    /** Add children dataNodes to the NodeOutlet */
    protected updateChildrenNodes(children?: T[]): void;
    /** Clear the children dataNodes. */
    protected _clear(): void;
    /** Gets the outlet for the current node. */
    private _getNodeOutlet;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<CdkNestedTreeNode<any, any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDeclaration<CdkNestedTreeNode<any, any>, "cdk-nested-tree-node", ["cdkNestedTreeNode"], { "role": "role"; "disabled": "disabled"; "tabIndex": "tabIndex"; }, {}, ["nodeOutlet"]>;
}

//# sourceMappingURL=nested-node.d.ts.map