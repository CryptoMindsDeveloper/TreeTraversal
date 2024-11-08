import React, { useEffect } from 'react';
import p5 from 'p5';

function AnimatedTraversal({ traversalType }) {
  useEffect(() => {
    const sketch = (p) => {
      let tree;
      let traversalOrder = [];
      let traversalIndex = 0;
      let isTraversing = false;
      let currentNode;

      class Node {
        constructor(value) {
          this.value = value;
          this.left = null;
          this.right = null;
          this.x = 0;
          this.y = 0;
        }
      }

   
      class Tree {
        constructor() {
          this.root = null;
        }

        insert(value) {
          const newNode = new Node(value);
          if (!this.root) {
            this.root = newNode;
            this.root.x = p.width / 2;
            this.root.y = 50;
          } else {
            this._insertNode(this.root, newNode);
          }
        }

        _insertNode(node, newNode, level = 1) {
          const offset = 60 / level;
          if (newNode.value < node.value) {
            if (!node.left) {
              node.left = newNode;
              newNode.x = node.x - offset * 100;
              newNode.y = node.y + 50;
            } else {
              this._insertNode(node.left, newNode, level + 1);
            }
          } else {
            if (!node.right) {
              node.right = newNode;
              newNode.x = node.x + offset * 100;
              newNode.y = node.y + 50;
            } else {
              this._insertNode(node.right, newNode, level + 1);
            }
          }
        }


        inorder(node) {
          if (node !== null) {
            this.inorder(node.left);
            traversalOrder.push(node);
            this.inorder(node.right);
          }
        }

        preorder(node) {
          if (node !== null) {
            traversalOrder.push(node);
            this.preorder(node.left);
            this.preorder(node.right);
          }
        }

        postorder(node) {
          if (node !== null) {
            this.postorder(node.left);
            this.postorder(node.right);
            traversalOrder.push(node);
          }
        }
      }

      p.setup = () => {
        p.createCanvas(400, 400);
        tree = new Tree();
        const values = [50, 30, 20, 40, 70, 60, 80];
        values.forEach((value) => tree.insert(value));
        startTraversal(traversalType);
      };

      p.draw = () => {
        p.background(255);
        displayTree(tree.root);

        if (isTraversing && traversalIndex < traversalOrder.length) {
          currentNode = traversalOrder[traversalIndex];
          traversalIndex++;
        } else {
          isTraversing = false;
        }

        if (currentNode) {
          p.fill(255, 0, 0);
          p.ellipse(currentNode.x, currentNode.y, 30);
        }
      };

      const displayTree = (node) => {
        if (node) {
          p.fill(0);
          p.ellipse(node.x, node.y, 30);
          p.fill(255);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(node.value, node.x, node.y);

          if (node.left) {
            p.line(node.x, node.y, node.left.x, node.left.y);
            displayTree(node.left);
          }
          if (node.right) {
            p.line(node.x, node.y, node.right.x, node.right.y);
            displayTree(node.right);
          }
        }
      };

      const startTraversal = (type) => {
        traversalOrder = [];
        traversalIndex = 0;
        currentNode = null;

        if (type === 'inorder') tree.inorder(tree.root);
        else if (type === 'preorder') tree.preorder(tree.root);
        else if (type === 'postorder') tree.postorder(tree.root);

        isTraversing = true;
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, [traversalType]);

  return <div id="p5-canvas" />;
}

export default AnimatedTraversal;