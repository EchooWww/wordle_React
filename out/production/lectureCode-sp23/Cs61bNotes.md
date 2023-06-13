# Data Structure & Algorithm

## Classes, Lists, Arrays, Maps

### Lists in Java

```java
//first import List
import java.util.List;
import java.util.ArrayList;

List L = new List () // ! cannot be instantiated like this, because List is abstract

List<String> L = new ArrayList(); // need to specify the type of elements in the list
L.append('A');
L.append('B');
System.out.ptintln(L); // [A, B]
System.out.println(L.get(0)); // A
```

- Java got bunch of implementations of lists: abstract data types vs. concrete implementations
  > LinkedList, ArrayList, Vector, Stack, Queue, Deque, etc.

### Arrays in Java

- Arrays are not dynamic, need to specify the size of the array
- Array is faster and performant than List, it is more core to the language than List, unlike Python

```java
String [] A = new String[5]; // Need to specify type and size
A[0] = "A";
A[1] = "B";
```

### Maps in Java

- Maps are called dictionaries in Python, which is a collection of key-value pairs.
- Map is also an abstract data type, need to specify the implementation: HashMap, TreeMap, etc.

```java
import java.util.Map;
import java.util.TreeMap;

Map<String, Integer> L = new TreeMap<String, Integer>();
L.put("dog","woof");
L.put("cat","meow");
String sound = L.get("dog"); // map works like list, but with keys instead of indices
System.out.println(sound); // woof

```

## References, Recursion, and Lists

### Reference type in Java

- Declaration: When we declare a variable of a reference type, we are creating a reference to an object of that type (64-bit pointer).
- Instantiation: The instantiation of an object is the creation of an object in memory. The new keyword has a return value, which is a **reference** to the object created. The reference is a pointer to the object in memory. (The memory it takes depends on the instance variables of the object.)
- Box and pointer annotation:
  ![image](img/box1.png)

#### The golden rule of equals

- Given variables b and a: b = a copies all the bits from a to b
- Passing parameters obeys the same rule: copy all the bits to the new scope, also called pass-by-value
- Be careful when passing reference types, because when you change the object in the new scope, you are changing the object in the old scope as well.

### The IntList class

#### Recursion

> Recursion is a method that calls itself.

> Call stack: the stack of frames that are created when a method is called (stackOverflowError: when the stack is too big)

- Base case: the condition that stops the recursion, to avoid infinite recursion
- Steps to base case: allows the recursion to reach the base case
- Get the size of IntList recursively:

  ```java

  public class IntList {
    public int first;
    public IntList rest;

    public IntList(int f, IntList r) {
      first = f;
      rest = r;
    }

    /** Return the value of the size with recursion*/
    public int size() {
      if (rest == null){
        return 1;
      } else {
        return 1 + rest.size();
      }
    }
    /** Return the value at specific index with recursion */
    public int get(int index) {
      if (index == 0) {
        return first;
      } else return rest.get(index - 1);
    }

    /** Return the value of the size with iteration*/
    public int iterativeSize() {
      IntList p = this;
      int size = 0;
      while (p!=null) {
        size += 1;
        p = p.rest;
      }
    }
    /** Returns an IntList identical to L, but with
      * each element incremented by x. L is not allowed
      * to change. */
    public static IntList incrList(IntList L, int x) {
        if (L.rest == null ) return new IntList(L.first + x, null);
        else return new IntList(L.first + x, incrList(L.rest, x));
    }
    /** Returns an IntList identical to L, but with
      * each element incremented by x. Not allowed to use
      * the 'new' keyword. */
    public static IntList dincrList(IntList L, int x) {
       if (L.rest == null) return new IntList(L.first, null);
       else return new IntList(L.first-x, dincrList(L.rest, x));
    }
    public static void main (String[] args) {
      IntList L = new IntList(15, null);
      L = new IntList(10, L);
      L = new IntList(5, L);
      System.out.println(L.size());
    }
  }
  ```

#### Nested classes

Some classes don't need to stand alone in a separate file, like `IntNode`:

```java
public class SLList {
  public class IntNode {
    public int item;
    public IntNode next;

    public IntNode(int i, IntNode n) {
      item = i;
      next = n;
    }

  }
  public IntNode first;
  public SLList(int x) {
    first = new IntNode(x, null);
  }


  public void addFirst(int x) {
  first =  new IntNode(x, first);
  }

  public int getFirst() {
    return first.item;
  }


  public static void main(String[] args) {
    /* Creates a list of one integer, namely 10 */
    SLList L = new SLList(15);
    L.addFirst(10);
    L.addFirst(5);
    System.out.println(L.getFirst());
  }
}
```

Keywords for nested classes:

- The nested class can access the private variables of the outer class, but not the other way around, nested class can be private.
- If we only need the nested class to be used by the outer class, we can make it private.
- If the nested class doesn't need to access the private variables of the outer class, it's better to make it static, so that it doesn't need to be instantiated in the outer class.

#### Private helper methods

```java
  public void addLast(int x) {
    addLast(first, x);
  }

  private void addLast(IntNode p, int x) {
    if (p.next == null) p.next = new IntNode(x, null);
    else addLast(p.next,x);
  }

  public int size() {
    return size(first);
  }

  private int size(IntNode p) {
    if (p.next == null) return 1;
    else return size(p.next);
  }

```

#### Improve the speed of size()

A much easier way: Initialize the size of the list when the list is created, and update the size when adding or removing elements.

#### The sentinel node to **ensure invariance**

The ugly way of handling the empty list:

```java
  private void addLast(IntNode p, int x) {
    if (p == null) {
      p = new IntNode(x, null);
    }
    else if (p.next == null) p.next = new IntNode(x, null);
    else addLast(p.next,x);
  }

  public int size() {
    return size(first);
  }

  private int size(IntNode p) {
    if (p.next == null) return 1;
    else return size(p.next);
  }
```

Instead of creating a special case for the empty list, we can create a sentinel node that points to the first node of the list. The sentinel node is always there, even when the list is empty.

```java

  private IntNode sentinel;
  private int size;
  public SLList() {
    sentinel = new IntNode(63, null);
    size = 0;
  }

  public SLList (int x) {
    sentinel = new IntNode(63, null);
    sentinel.next = new IntNode(x, null);
    size = 1;
  }


  public void addFirst(int x) {
  sentinel.next = new IntNode(x, sentinel.next);
  size++;
  }

  public int addLast(int x) {
    IntNode p = sentinel;
    while (p.next != null) {
      p = p.next;
    }
    p.next = new IntNode(x, null);
    size++;
  }
```

#### The DLList class - Doubly linked list

- The DLList class is a doubly linked list, which means that each node has a reference to the previous node as well as the next node.

- In DLList class, we have one sentinal node in both the front and the back of the list, so sentinel.next is the first node of the list, and sentinel.prev is the last node of the list.

```java

public class DLList {
  private IntNode sentinel;
  private int size;
  public DLList() {
    sentinel = new IntNode(63, null, null);
    size = 0;
  }

  public DLList (int x) {
    sentinel = new IntNode(63, null, null);
    sentinel.next = new IntNode(x, sentinel, sentinel);
    size = 1;
  }

  private class IntNode {
    public int item;
    public IntNode next;
    public IntNode prev;

    public IntNode(int i, IntNode n, IntNode p) {
      item = i;
      next = n;
      prev = p;
    }
  }

  public void addFirst(int x) {
    sentinel.next = new IntNode(x, sentinel.next, sentinel);
    size++;
  }

  public void addLast(int x) {
    sentinel.prev = new IntNode(x, sentinel, sentinel.prev);
    size++;
  }

  public static void main(String[] args) {
    DLList L = new DLList(15);
    L.addFirst(10);
    L.addFirst(5);
    L.addLast(20);
    System.out.println(L.size());
  }
}
```

#### Generic type of SLList

The way we implemented SLList is not flexible enough, we can only store integers in the list. We can use generics to make the list more flexible.

Add a type parameter to the class name, and use the type parameter in the class definition:

```java
public class SLList<LochNess> {
  public class IntNode {
    public LochNess item;
    public IntNode next;

    public IntNode(LochNess i, IntNode n) {
      item = i;
      next = n;
    }

  }
  public IntNode first;
  public SLList(LochNess x) {
    first = new IntNode(x, null);
  }
```

### Arrays

- Arrays are using memory boxes that are numbered instead of named.
  Arrays are fixed in size, we can't add or remove elements from an array.
- Unlike python, we can't have arrays of different types in Java.
- Unlike class, arrays have no methods, we can only access the elements and the length of the array.

#### Notations for arrays

```java
int[] z = new int[3];
int[] x, y;
x = new int[]{1, 2, 3}; // can omit the length if we are providing the elements.
int [] w = {9, 10, 11}; // can omit the new keyword if we are declaring and initializing at the same time. cannot do this for an already declared variable.
```

#### Copying arrays

System.arraycopy() method can be a better way to copy the array than using a for loop, especially when we are copying a part of the array or the array is large.

```java
System.arraycopy(a, 0, b, 2, 3); // copy 3 elements from a, starting from index 0, to b, starting from index 2.
```

#### 2D arrays

```java
int[][] pascalsTriangle; // make me an array of array references
int [][] matrix = new int[4][]; // creates 1 array of length 4, but each element is null.
matrix = new int[4][4]; // create 5 arrays in total
int [][] pascalAgain = new int[][]{{1}, {1, 1}, {1, 2, 1}, {1, 3, 3, 1}};
```

#### Array vs. Classes

- To access a member of an array, we use the index of the element. While to access a member of a class, we use the name of the member. We can get the index at the runtime, but the only way to get the name of a member is to hard code it.
- In short, the Java complier won't consider elements around the dot notation as a variable, it will only consider the name of the member.

#### The closet example

```java
public class Closet {
  class Clothing {
    private String type;
    private String color;

    public Clothing(String type, String color) {
      this.type = type;
      this.color = color;
    }

  public Set<Clothing> uniqueItems;
  public Map<String, List<Clothing>> itemsByColor;

  // Use set to store unique items
  public Closet (List<Clothing> clothList) {
    Set<Clothing> uniqueItems = new HashSet<>();
    for (Clothing cloth: clothList) {
      uniqueItems.add(cloth);
    }
    this.uniqueItems = uniqueItems;

    // Use map to store items by color (key-value pair)
    itemsByColor = new HashMap<>();
    for (Clothing cloth: uniqueItems){
      if(!itemsByColor.containsKey(cloth.color)) {
        List<Clothing> list2 = new ArrayList<>();
        list2.add(cloth);
        itemsByColor.put(cloth.color, list2);
      }
      else itemsByColor.get(cloth.color).add(cloth);
    }
  }

}
```
## Tests


### Write a test with Truth and junit

```java
import org.junit.jupiter.api.Test;

import static com.google.common.truth.Truth.assertThat;

public class SortTest {
    /** Test the sort method of the Sort class */
    @Test
    //Test methods are not static
    public void sortTest() {
        String [] input = {"rawr", "a", "zaza", "newway"};
        String [] expected = {"a", "newway", "rawr", "zaza"};
        Sort.sort(input);
        assertThat(input).isEqualTo(expected);

    }
}
```

### Sorting and selection sort
- Find the smallest item
- Move it to the front  (we are using swapping, instead of sliding everything over, because it's faster)
- Selection sort the remaining N-1 items without touching front item

Implement selection sort with recursion:
```java
public class Sort {
	/** Sort the strings in alphabetical order from index 0. */
	public static void sort(String[] x) {
		sort(x, 0);
	}
    
    /** Sort the strings from index k */
	public static void sort(String[] x, int k) {
        /**The base case */
		if (k == x.length) return;
		else {
			int smallestIndex = findSmallest(x, k);
			swap(x, k, smallestIndex);
			sort(x, k + 1);
		}
	}

	/** Returns index of smallest string. */
	public static int findSmallest(String[] x, int k) {
		int smallestIndex = k;
		for (int i = k; i < x.length; i++) {
			if(x[i].compareTo(x[smallestIndex])<0) {
				smallestIndex = i;
			}
		}
		return smallestIndex;
	}
    
    /** Swap 2 elements in the list */
	public static void swap(String[] input, int a, int b) {
		String temp = input[a];
		input[a] = input[b];
		input[b] = temp;
	}
}
```

## ArrayList

Is doubly linked list good enough? Sometimes it can be really slow: especially when we want to get items in a big long list when the items is not near the sentinel node.

Arrays have a much faster retrival!

### AList
In the AList class, when we removeLast(), it's no need to change the value of the last element
```java
    /** Deletes item from back of the list and
      * returns deleted item. */
    // we don't actually need to change the value of the element, we only need to decrement the size
    public int removeLast() {
        size--;
        return items[size-1];
    }
```
> Limitation of AList: needs resizing
```java
//need to copy the array with a larger size
public void addLast(int x) {
  if (size == items.length) {
    int[] a = new int[size+1];
    System.arraycopy(items, 0, a, 0, size);
    a[size] = 11;
    items = a;
  } else {
    items[size] = x;
    size++;
  }
}
```
We can have a separate resize method
- The product of resizing: inserting elements take much more time than SLList, and the time complexity is not linear like SLList
w