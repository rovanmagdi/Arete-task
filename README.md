
## **Table of Contents**
- [Setup](#setup)
- [Technical Decisions](#technical-decisions)
  - [Infinite Scroll (Part 1)](#infinite-scroll-part-1)
  - [Dedicated Pagination (Part 2)](#dedicated-pagination-part-2)
  - [Drag-and-Drop Dashboard (Part 3)](#drag-and-drop-dashboard-part-3)
- [Trade-offs Between Two Libraries](#trade-offs-between-two-libraries)
- [Performance Optimizations](#performance-optimizations)
- [Challenges ](#challenges)

## **Setup**

1. **Clone the repository:**
  ```sh
   git clone https://github.com/rovanmagdi/Arete-task.git
   cd Arete-task
   ```
  
2. **Install node modules:**
  ```sh
   npm install
   ```
3. **Start  server:**
  ```sh
   npm start
   ```


## **Technical Decisions**

<!-- ### **Infinite Scroll (Part 1)**
- **Library Used:** `react-window` for list virtualization.
- **Why:** Efficient rendering of large datasets and reduced memory footprint.
- **Data Fetching:** Lazy loading images from a mock API.
- **Performance Features:**
  - Used `useMemo` and `useCallback` to avoid unnecessary re-renders.
  - Debounced scroll events to reduce API calls.
  - Implemented a "Load More" button for users who prefer manual fetching. -->

### **Dedicated Pagination (Part 2)**
- **Library Used:** `react-query` for data fetching and caching.
- **Pagination Strategy:**
  - Implemented both `page` and `limit` query parameters.
- **Why:** Efficient cache management and reduced redundant API calls.
- **Performance Features:**
  - Cached previous pages with react-query for faster navigation.
  - Implemented skeleton loaders to improve perceived performance.

### **Drag-and-Drop Dashboard (Part 3)**
- **Library Used:** `react-beautiful-dnd` for drag-and-drop functionality.
- **Why:** Smooth drag interactions, accessibility, and state persistence.
- **Charting Library:** `recharts` for interactive analytics visualization.
- **Features:**
  - Four draggable charts.
  - Order persistence to a mock API.
  - Reset button to restore the default order.

## **Trade-offs Between Libraries**
| Feature | react-window | react-virtualized |
|---------|--------------|-------------------|-----------|
| Downloads (npm - last month) | ~2.5M+	| ~1.2M+	|
| Dependencies	| Minimal	| More dependencies, including polyfills	|
| Performance | Faster due to smaller size and optimized rendering | Heavier but supports more features. |

## **Performance Optimizations**
- **1-** Used virtualization (`react-window`), memoization (`useMemo`,`useCallback`).
- **2-** Cached API responses with `react-query` to avoid refetching previously loaded pages.

## **Challenges**

### **Infinite Scroll (Part 1)**
- Preventing duplicate API calls when users scrolled too quickly.
- Balancing UI performance with smooth user experience.

### **Dedicated Pagination (Part 2)**
- Deciding between offset-based and cursor-based pagination.
- Ensuring seamless navigation while caching previous pages.

### **Drag-and-Drop Dashboard (Part 3)**
- Handling persistence of reordered charts.
- Ensuring drag-and-drop remains smooth on mobile devices.






