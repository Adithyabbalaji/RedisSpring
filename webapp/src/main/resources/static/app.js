
// DOM Elements
const productForm = document.getElementById('product-form');
const productIdInput = document.getElementById('product-id');
const productNameInput = document.getElementById('product-name');
const idError = document.getElementById('id-error');
const nameError = document.getElementById('name-error');
const productList = document.getElementById('product-list');
const productTable = document.getElementById('product-table');
const emptyMessage = document.getElementById('empty-message');
const loadingSpinner = document.getElementById('loading');
const toastContainer = document.getElementById('toast-container');

// Backend API URL
const API_URL = 'http://localhost:9090/product';

// Fetch all products on page load
document.addEventListener('DOMContentLoaded', fetchProducts);

// Add event listener to form submission
productForm.addEventListener('submit', handleFormSubmit);

// Function to fetch all products from backend
async function fetchProducts() {
  showLoading(true);
  
  try {
    const response = await fetch(`${API_URL}/all`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const products = await response.json();
    console.log('Fetched products:', products);
    
    renderProducts(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    showToast('Error', 'Failed to load products. Check backend connection.', 'error');
  } finally {
    showLoading(false);
  }
}

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();
  
  // Validate form
  let isValid = validateForm();
  
  if (isValid) {
    const productId = productIdInput.value.trim();
    const productName = productNameInput.value.trim();
    
    try {
      const response = await fetch(API_URL , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId,
          name: productName,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      // Refresh product list
      fetchProducts();
      
      // Show success toast
      showToast('Success', 'Product saved successfully!', 'success');
      
      // Reset form
      productForm.reset();
      idError.textContent = '';
      nameError.textContent = '';
      
    } catch (error) {
      console.error('Failed to save product:', error);
      showToast('Error', 'Failed to save product. Is the backend server running?', 'error');
    }
  }
}

// Function to validate form
function validateForm() {
  let isValid = true;
  
  // Reset error messages
  idError.textContent = '';
  nameError.textContent = '';
  
  // Validate product ID
  if (!productIdInput.value.trim()) {
    idError.textContent = 'Product ID is required';
    isValid = false;
  }
  
  // Validate product name
  if (!productNameInput.value.trim()) {
    nameError.textContent = 'Product name is required';
    isValid = false;
  }
  
  return isValid;
}

// Function to render products in the table
function renderProducts(products) {
  // Clear existing products
  productList.innerHTML = '';
  
  if (products.length === 0) {
    productTable.style.display = 'none';
    emptyMessage.style.display = 'block';
    return;
  }
  
  productTable.style.display = 'table';
  emptyMessage.style.display = 'none';
  
  // Add products to table
  products.forEach(product => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
    `;
    
    productList.appendChild(row);
  });
}

// Function to show/hide loading spinner
function showLoading(isLoading) {
  if (isLoading) {
    loadingSpinner.style.display = 'flex';
    productTable.style.display = 'none';
    emptyMessage.style.display = 'none';
  } else {
    loadingSpinner.style.display = 'none';
  }
}

// Function to show toast notification
function showToast(title, message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  toast.innerHTML = `
    <div>
      <div class="toast-title">${title}</div>
      <div class="toast-description">${message}</div>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Remove toast after 5 seconds
  setTimeout(() => {
    toast.style.animation = 'fade-out 0.5s forwards';
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 5000);
}
