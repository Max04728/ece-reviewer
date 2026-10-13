---
title: Computer Systems, OOP and CAD
part: GEAS
tags: [ece, geas, formula-sheet]
topics: 8
---

## Part A — OOP and Programming Fundamentals

### 1. OOP Fundamentals: Classes, Objects and the Four Pillars

![](https://www.youtube.com/watch?v=1ONhXmQuWP8)

*Video: Object-Oriented Programming: The Four Pillars — Keep On Coding, 11:23*

**Class vs object vs instance ★**

| Term | Meaning | Example |
|---|---|---|
| Class | Blueprint that declares fields (state) and methods (behaviour) | `class Student` |
| Object | Runtime entity created from a class | `new Student()` |
| Instance | An object regarded as a member of its class | `s1` is an instance of `Student` |

**The four pillars ★**

| Pillar | Mechanism | Test question |
|---|---|---|
| Encapsulation | Private fields + public getters/setters (data hiding) | Are fields reachable only through methods? |
| Abstraction | Expose the interface, hide the implementation | Can a caller use it without knowing internals? |
| Inheritance | Subclass reuses and extends a superclass (`is-a`) | Is the child a kind of the parent? |
| Polymorphism | Dynamic method dispatch (late binding) via overriding | Does one call run different code per type? |

$$ \text{object} = \text{state (fields)} + \text{behaviour (methods)} + \text{identity} $$

> [!tip] High-yield ★
> Four pillars in one word each: **hide** (encapsulation), **simplify** (abstraction), **reuse** (inheritance), **redefine** (polymorphism).

**Conditions:** encapsulation hides state behind accessors, not behind inheritance; polymorphism needs an inheritance or interface relation plus an overridden method bound at run time. #oop

---

### 2. Inheritance, Interfaces and Polymorphism

![](https://www.youtube.com/watch?v=jhDUxynEQRI)

*Video: Java Polymorphism Fully Explained — Coding with John, 7:16*

**Abstract class vs interface ★**

| Aspect | Abstract class | Interface |
|---|---|---|
| Implementation | May carry partial implementation | Declares behaviour, no implementation |
| State | May declare instance fields | Constants only |
| Inheritance | Single (`extends`) | Many (`implements`) |
| Constructor | Yes | No |
| Use when | Shared state and code among close relatives | A capability contract for unrelated types |

**Overloading vs overriding ★**

| Feature | Overloading | Overriding |
|---|---|---|
| Binding | Compile time (static) | Run time (dynamic, late binding) |
| Where | Same class, different parameter lists | Subclass redefines a superclass method |
| Signature | Must differ in parameters | Must be identical |
| Gives | Convenient API | Polymorphism |

**Access modifiers (widest last):** `private` (class only) → default/package (package) → `protected` (package + subclasses) → `public` (all).

**`static` vs instance ★:** a static member belongs to the class, exists once, has no `this` and is called as `Class.member`; instance members are copied per object.

**Composition vs inheritance:** *is-a* → inheritance; *has-a* → composition or aggregation. Prefer composition when the relation is not a true subtype.

$$ \text{compile time} \rightarrow \text{overloading},\qquad \text{run time} \rightarrow \text{overriding} $$

**Conditions:** overriding requires an inheritance or interface relation, an identical signature and an accessible, non-final method; constructors are neither inherited nor overridden. #oop

---

### 3. Data Types, Casting and Control Flow

![](https://www.youtube.com/watch?v=sGeOEEBNrXM)

*Video: Java Type Casting, Control Flow and Loops — Hathaway Education, 32:52*

**Primitive types ★**

| Type | Size | Range / note |
|---|---|---|
| `byte` | 8-bit | $-128$ to $127$ |
| `short` | 16-bit | $-32\,768$ to $32\,767$ |
| `int` | 32-bit | $\approx \pm 2.15\times10^{9}$ |
| `long` | 64-bit | $\approx \pm 9.22\times10^{18}$ |
| `float` | 32-bit | IEEE 754 single, $\approx 7$ significant digits |
| `double` | 64-bit | IEEE 754 double, $\approx 15$ significant digits |
| `char` | 16-bit | Unicode $0$ to $65\,535$ (unsigned) |
| `boolean` | JVM-dependent | `true` / `false` only |

**Reference vs primitive ★:** a primitive variable holds the value itself; a reference variable holds the address of a heap object. `==` compares values for primitives but references for objects (use `equals` for content).

**Casting ★:** widening is automatic and lossless (`int → long → float → double`); narrowing is explicit and may truncate or lose precision.

**Loop forms ★**

| Loop | Test position | Minimum iterations |
|---|---|---|
| `while` | Pre-test (before the body) | 0 |
| `do-while` | Post-test (after the body) | 1 |
| `for` | Pre-test, count-controlled | 0 |

**Recursion vs iteration:** recursion repeats through the call stack and needs a base case; iteration repeats in place with a loop variable. Each recursive call costs a stack frame.

$$ (int)\,x\ \text{truncates toward zero},\qquad (double)\,i\ \text{is exact for } \lvert i\rvert < 2^{53} $$

**Conditions:** `char` is a 16-bit unsigned Unicode code unit; narrowing conversions require explicit cast syntax; recursion without a base case throws `StackOverflowError`. #oop

---

### 4. Exception Handling and Programming Paradigms

![](https://www.youtube.com/watch?v=1XAfapkBQjk)

*Video: Exception Handling in Java — Coding with John, 13:20*

**`try` / `catch` / `finally` ★**

| Block or keyword | Role |
|---|---|
| `try` | Encloses statements that may throw |
| `catch` | Handles one specific exception type |
| `finally` | Always executes — cleanup: closing files, releasing connections |
| `throw` | Raises an exception object |
| `throws` | Declares in a method signature what may propagate |

**Checked vs unchecked ★**

| Kind | Checked at compile time? | Examples |
|---|---|---|
| Checked | Yes — must catch or declare | `IOException`, `SQLException` |
| Unchecked | No — runtime only | `NullPointerException`, `ArithmeticException`, `ArrayIndexOutOfBoundsException` |
| `Error` | No — JVM level, not handled | `OutOfMemoryError`, `StackOverflowError` |

**Cost of exceptions:** construction captures a stack trace, so throwing inside a hot loop is expensive; reserve exceptions for exceptional flow, not normal control flow.

**Functional programming paradigm ★**

| Property | Meaning |
|---|---|
| Immutability | Data is never modified in place; new values are produced |
| Statelessness | No mutable global state between calls |
| Pure function | Same input always gives the same output, no side effects |
| Higher-order function | Takes or returns a function (`map`, `filter`, `reduce`) |
| Contrast | Imperative/OOP mutates state step by step; functional composes expressions |

$$ \text{pure}(f) \iff \forall x:\ f(x)\ \text{is constant and side-effect free} $$

**Symbols**

- $\text{pure}(f)$ — predicate asserting that the function $f$ is pure, dimensionless
- $f$ — function being tested, dimensionless
- $x$ — input value supplied to the function, dimensionless
- JVM — Java Virtual Machine, the runtime that loads classes, executes Java bytecode and raises `Error`s such as `OutOfMemoryError` and `StackOverflowError` (platform name, dimensionless)

**Conditions:** `finally` runs whether or not an exception is thrown and even on `return`, except when the JVM exits or the thread is killed. #software

---

## Part B — Software Engineering and UML

### 5. SDLC Phases and Process Models

![](https://www.youtube.com/watch?v=d7S8m_4-Iks)

*Video: SDLC Explained: Waterfall vs Agile vs Spiral — LogicUnboxed, 6:34*

**SDLC phases ★**

| Phase | Main deliverable |
|---|---|
| Requirements and planning | Software requirements specification (SRS) |
| Design | Architecture and UML models |
| Implementation | Source code |
| Testing | Test cases and defect reports |
| Deployment | Released, installed system |
| Maintenance | Patches, enhancements, new versions |

**Process models ★**

| Model | Character |
|---|---|
| Waterfall | Sequential phases; each signed off before the next; late changes are costly |
| Iterative / incremental | Repeated cycles deliver the system in growing increments |
| Agile | Short iterations, working software, customer collaboration over documentation |
| Scrum | Agile framework with fixed-length sprints and defined roles and ceremonies |

**Scrum vocabulary:** roles — product owner, Scrum master, development team. Artifacts — product backlog, sprint backlog, increment. Ceremonies — sprint planning, daily stand-up, sprint review, retrospective.

$$ \text{sprint} \le 4\ \text{weeks (typically } 2\text{)},\qquad \text{increment} = \text{sum of completed sprint backlogs} $$

**Symbols**

- SDLC — software development life cycle, the staged process of requirements, design, implementation, testing, deployment and maintenance (framework name, dimensionless)
- $\text{sprint}$ — timeboxed iteration length, at most 4 weeks, in s
- $\text{increment}$ — working product delivered so far, the sum of the completed sprint backlogs, dimensionless

**Conditions:** waterfall assumes stable, fully known requirements; iterative and agile models assume changing requirements and frequent customer feedback. #software

---

### 6. UML Diagrams: Structure, Behaviour and Relationships

![](https://www.youtube.com/watch?v=6XrL5jXmTwM)

*Video: UML Class Diagrams — Lucid Software, 12:24*

**Diagram families ★**

| Family | Diagrams |
|---|---|
| Structural (static) | Class, object, component, deployment |
| Behavioural (dynamic) | Use case, sequence, activity, state machine |

**Class-diagram notation ★**

| Symbol | Meaning |
|---|---|
| `+` / `-` / `#` / `~` | public / private / protected / package visibility |
| `attribute : type` | Field with its data type |
| `operation(params) : return` | Method with parameters and return type |
| Italic class name | Abstract class |
| Underlined member | Static (class-level) member |

**Relationships ★**

| Relationship | Notation | Meaning |
|---|---|---|
| Generalization | Solid line, hollow triangle at the parent | Inheritance (`is-a`) |
| Realization | Dashed line, hollow triangle | Class implements an interface |
| Association | Plain solid line | Structural link between classes |
| Aggregation | Hollow diamond at the whole | Weak `has-a`; part can outlive the whole |
| Composition | Filled diamond at the whole | Strong `has-a`; part dies with the whole |
| Dependency | Dashed arrow | Uses another class temporarily |

**Multiplicity / cardinality ★**

| Notation | Meaning |
|---|---|
| `1` | Exactly one |
| `0..1` | Zero or one (optional) |
| `1..*` | One or more |
| `0..*` or `*` | Zero or more |

**Use-case and sequence diagrams:** a use-case diagram shows actors (external entities, drawn as stick figures) and use cases (ellipses) inside a system boundary. A sequence diagram shows lifelines (boxes over dashed vertical lines), messages as horizontal arrows in time order, and activation bars for execution.

$$ \text{composition} \Rightarrow \text{filled diamond},\qquad \text{aggregation} \Rightarrow \text{hollow diamond} $$

**Symbols**

- UML — Unified Modeling Language, the standard graphical notation for specifying, visualising and documenting the structure and behaviour of a software system, dimensionless (notation-standard name)

> [!tip] High-yield ★
> Filled diamond = **composed** (part cannot exist alone); hollow diamond = **aggregated** (part can exist alone). The diamond always sits on the **whole** end.

**Conditions:** an actor is always external to the system; multiplicity is read at the opposite end of the association from the class being described. #uml #software

---

## Part C — GUI and Computer-Aided Design

### 7. GUI Vocabulary and Event Handling

**Definition ★:** a graphical user interface (GUI) is interaction through graphical icons and visual indicators — windows, menus, buttons — rather than a command line. The classic interaction style is WIMP (windows, icons, menus, pointer).

**Event model ★**

| Term | Meaning |
|---|---|
| Event | A user or system action: mouse click, key press, window resize |
| Event source | The widget that generates the event |
| Event listener | Object registered against a widget to detect user actions |
| Event handler / callback | Method the framework invokes when the event fires |
| Event-dispatch model | The event thread dequeues events and invokes handlers in order |

**Layout managers ★**

| Manager | Behaviour |
|---|---|
| `BorderLayout` | Five regions: North, South, East, West, Centre; Centre absorbs extra space |
| `FlowLayout` | Places components left to right, wrapping to the next row, like text |

**Toolkits and the Win32 API:** `java.awt` provides heavyweight components backed by OS peers; `javax.swing` provides lightweight components with a pluggable look and feel. In the Win32 API, `CreateWindow()` and `CreateWindowEx()` create and register an application window, returning a handle (HWND) that receives `WM_*` messages from the message loop.

**Input validation ★:** check type, range and format before the system processes the data; reject or sanitize invalid input to prevent overflow, corruption and injection.

$$ \text{GUI} = \text{widgets} + \text{layout} + \text{event loop} $$

**Symbols**

- HWND — window handle, the opaque identifier that `CreateWindow()` / `CreateWindowEx()` returns and that receives `WM_*` messages from the message loop, dimensionless (OS handle, not a quantity)
- API — application programming interface, the set of functions, messages and data structures that an operating system or library exposes to an application, dimensionless (programmatic-contract label)

> [!warning] Exam trap
> `CreateWindow()` only registers the window class and returns a handle — the window is not visible until the message loop (`GetMessage` / `DispatchMessage`) starts pumping messages.

**Conditions:** GUI updates must run on the event-dispatch thread; CLI interaction is text-command driven while GUI interaction is pointer and widget driven. #software

---

### 8. CAD Drafting Aids, Coordinates and Documentation

![](https://www.youtube.com/watch?v=UjXY85CgIb0)

*Video: Learn the Different AutoCAD Coordinate Systems — Kaiser Obillo, 11:19*

**CAD definition ★:** computer-aided design is the use of software to create, modify, analyse and document 2D/3D engineering drawings. The drawing file is a database of geometry, layers, dimensions and annotation.

**Drafting aids ★**

| Command or key | Effect |
|---|---|
| Ortho mode (F8) | Constrains pointer movement to the horizontal and vertical axes, i.e. $0^\circ/90^\circ/180^\circ/270^\circ$ |
| CHAMFER | Bevels (cuts) a corner — needs two distances or distance + angle |
| FILLET | Rounds a corner with an arc — needs a radius |
| PAN | Shifts the view without changing the zoom factor |
| ZOOM | Changes magnification without moving or resizing geometry |

**Model space vs paper space ★**

| Space | Content |
|---|---|
| Model space | Full-scale (1:1) geometry — everything is drawn true size |
| Paper space / layout | Scaled drawing sheet with title block, border and viewports into model space |

**Layers, linetypes and lineweights:** a layer groups geometry and carries colour, linetype, lineweight and on/off state. Linetypes include continuous, hidden (dashed) and centre (long-short). Lineweight is the plotted width in mm.

**Coordinate entry ★**

| Mode | Format | Example |
|---|---|---|
| Absolute | `x,y` | `10,20` |
| Relative | `@dx,dy` | `@10,0` |
| Polar | `@distance<angle` | `@10<45` |

**Dimensioning and tolerances:** linear, aligned, angular, radius and diameter dimensions annotate true sizes. A tolerance is the permitted variation, written as a bilateral limit ($\pm t$) or as upper/lower limits.

**Scale factor ★**

$$ S = \frac{\text{paper distance}}{\text{model distance}},\qquad \text{paper distance} = S \times \text{model distance} $$

**Orthographic and isometric views:** orthographic projection shows front, top and side views with true shape (first-angle or third-angle arrangement); an isometric drawing shows the three axes at $120^\circ$ with equal foreshortening. A bill of materials (BOM) lists part numbers, descriptions, materials and quantities; revision control records revision letter, date, description and approval.

**Conditions:** ortho mode constrains the pointer only, not typed coordinates; a viewport carries its own plot scale; a 100 m wall drawn 50 mm gives $S = 1:2000$. #cad

> [!warning] Exam trap
> Scale factor is paper distance over model distance, so a scale of $1:100$ gives $S = 0.01$ — do not invert it when calculating the plotted length.

→ Back to [[00_Index]]
