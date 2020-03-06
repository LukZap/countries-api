import React from 'react'

const Main = () => {
    return (
        <main>
            <div className="search-filter-menu">
                <div class="input-wrapper">
                    <input type="search" placeholder="Search for a country..." />
                    <i class="fas fa-search"></i>
                </div>
                <select>
                    <option>Africa</option>
                    <option>America</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                </select>
            </div>

            <div>
                Country list
            </div>
        </main>
    );
}

export default Main;