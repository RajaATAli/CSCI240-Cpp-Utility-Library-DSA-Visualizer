class Node {
  constructor(value) {
      this.value = value;
      this.next = null;
  }
}

class LinkedList {
  constructor() {
      this.head = null;
      this.nodes = [];
  }

  insertAtEnd(value) {
      let newNode = new Node(value);
      if (!this.head) {
          this.head = newNode;
      } else {
          let current = this.head;
          while (current.next) {
              current = current.next;
          }
          current.next = newNode;
      }
      this.updateNodes();
      setTimeout(() => { this.updateDisplay(); }, 1000);
  }

  deleteFromEnd() {
      if (!this.head) {
          return;
      }

      if (!this.head.next) {
          this.head = null;
      } else {
          let current = this.head;
          while (current.next.next) {
              current = current.next;
          }
          current.next = null;
      }
      this.updateNodes();
      this.updateDisplay();
  }

  updateNodes() {
      this.nodes = [];
      let current = this.head;
      while (current) {
          this.nodes.push(current.value);
          current = current.next;
      }
  }

  updateDisplay() {
    const container = d3.select('#linkedListContainer');
    container.selectAll('*').remove();
    const nodeContainer = container.selectAll('.node-container')
      .data(this.nodes)
      .enter()
      .append('div')
      .classed('node-container', true);

    nodeContainer.append('div')
      .classed('node-text', true)
      .text(d => d);

    // Append a new div for the node label
    const nodeLabel = nodeContainer.append('div')
      .classed('node-label', true);

    // Add the text to the new div
    nodeLabel.append('span')
      .attr('class', (d, i) => {
        if (i === 0) return 'head';
        if (i === this.nodes.length - 1) return 'tail';
        return '';
      })
      .text((d, i) => {
        if (i === 0) return 'Head';
        if (i === this.nodes.length - 1) return 'Tail';
        return '';
      });


    setTimeout(() => {
        d3.selectAll('.node.new-node').classed('new-node', false); // Animate the nodes
    }, 50);

      nodeContainer.each(function(d, i, nodes) {
          if (i !== nodes.length - 1) {
              d3.select(this).append('div')
                .classed('arrow', true)
                .html('&#x2192;');
          }
      });
  }
}

let linkedList = new LinkedList();

function insertAtEnd() {
  let value = document.getElementById('linkedListInput').value;
  linkedList.insertAtEnd(value);
  document.getElementById('linkedListInput').value = '';
}

function deleteFromEnd() {
  linkedList.deleteFromEnd();
}
