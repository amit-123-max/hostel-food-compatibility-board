import { useState } from 'react';
import { evaluateCompatibility } from './compatibility.js';
import { initialBudget, initialResidents, initialDishes } from './data.js';

export default function App() {
  const [budget, setBudget] = useState(initialBudget);
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleCheckCompatibility = () => {
    const budgetValue = Number(budget);
    const evaluation = evaluateCompatibility(initialResidents, initialDishes, budgetValue);
    setResult(evaluation);
  };

  const handleReset = () => {
    setBudget(initialBudget);
    setSearchQuery('');
    setResult(null);
  };

  let displayedDishes = [];
  if (result && (!result.errors || result.errors.length === 0)) {
    const query = searchQuery.toLowerCase();
    displayedDishes = result.compatible.filter((dish) => {
      const matchCafe = dish.cafe.toLowerCase().includes(query);
      const matchName = dish.name.toLowerCase().includes(query);
      const matchTags = dish.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchCafe || matchName || matchTags;
    });
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Hostel Food Compatibility Board</h1>

      {/* INPUT TABLES (Required by contract) */}
      <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
        <div>
          <h3>Resident Group</h3>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f0f0f0' }}>
              <tr><th>Name</th><th>Diet</th><th>Allergens</th></tr>
            </thead>
            <tbody>
              {initialResidents.map(r => (
                <tr key={r.id}>
                  <td>{r.name}</td><td>{r.diet}</td><td>{r.allergens.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3>Menu Sources</h3>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f0f0f0' }}>
              <tr><th>ID</th><th>Dish</th><th>Diet</th><th>Price</th></tr>
            </thead>
            <tbody>
              {initialDishes.map(d => (
                <tr key={d.id}>
                  <td>{d.id}</td><td>{d.name}</td><td>{d.dietClass}</td><td>₹{d.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <hr style={{ marginBottom: '20px' }} />

      {/* CONTROLS */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#eef2f5', borderRadius: '5px' }}>
        <label style={{ fontWeight: 'bold' }}>
          Group Budget (₹):
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', width: '80px' }}
          />
        </label>
        <button onClick={handleCheckCompatibility} style={{ marginLeft: '20px', padding: '6px 12px', cursor: 'pointer' }}>
          Evaluate Compatibility
        </button>
        <button onClick={handleReset} style={{ marginLeft: '10px', padding: '6px 12px', cursor: 'pointer' }}>
          Reset
        </button>
      </div>

      {/* ERROR BANNER */}
      {result && result.errors && result.errors.length > 0 && (
        <div style={{ backgroundColor: '#ffcccc', color: '#990000', padding: '15px', borderRadius: '4px' }}>
          <h3 style={{ marginTop: 0 }}>Input Validation Failed</h3>
          <ul style={{ marginBottom: 0 }}>
            {result.errors.map((error, idx) => (
              <li key={idx}>
                <strong>{error.code}</strong> on {error.table} table (Row: {error.row || 'N/A'}, Field: {error.field})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SUCCESS RESULTS */}
      {result && (!result.errors || result.errors.length === 0) && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#2e7d32' }}>Compatible Count: {result.count}</h2>
            <label>
              <strong>Search:</strong>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cafe, name, tags..."
                style={{ marginLeft: '10px', padding: '5px', width: '250px' }}
              />
            </label>
          </div>

          <h3>Compatible Dishes</h3>
          <table border="1" cellPadding="10" style={{ width: '100%', marginBottom: '30px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#e8f5e9' }}>
              <tr><th>ID</th><th>Cafe</th><th>Name</th><th>Diet Class</th><th>Tags</th><th>Price</th></tr>
            </thead>
            <tbody>
              {displayedDishes.length > 0 ? (
                displayedDishes.map(dish => (
                  <tr key={dish.id}>
                    <td>{dish.id}</td><td>{dish.cafe}</td><td>{dish.name}</td><td>{dish.dietClass}</td><td>{dish.tags.join(', ')}</td><td>₹{dish.price}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" style={{ textAlign: 'center' }}>No matching dishes found.</td></tr>
              )}
            </tbody>
          </table>

          <h3>Excluded Dishes</h3>
          <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#ffebee' }}>
              <tr><th>Dish ID</th><th>Rejection Reasons (Ordered)</th></tr>
            </thead>
            <tbody>
              {result.exclusions.length > 0 ? (
                result.exclusions.map((exclusion, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 'bold' }}>{exclusion.dishId}</td>
                    <td style={{ color: '#c62828' }}>{exclusion.reasons.join(', ')}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="2" style={{ textAlign: 'center' }}>No exclusions.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}