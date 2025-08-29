import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transmision } from '../types/sanity';

interface Props {
  transmisiones: Transmision[];
  onFilterChange: (filtered: Transmision[]) => void;
}

const tiposVehiculos = [
  { id: 'sedan', nombre: 'Sedán', icon: '🚗', marcas: ['Toyota', 'Honda', 'Hyundai'] },
  { id: 'suv', nombre: 'SUV', icon: '🚙', marcas: ['Toyota', 'Hyundai', 'Kia'] },
  { id: 'pickup', nombre: 'Pickup', icon: '🛻', marcas: ['Toyota', 'Nissan', 'Mitsubishi'] },
  { id: 'van', nombre: 'Van', icon: '🚐', marcas: ['Hyundai', 'Kia'] },
];

const FiltroTipoVehiculo: React.FC<Props> = ({ transmisiones, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTipos, setSelectedTipos] = useState<string[]>([]);
  const [selectedMarcas, setSelectedMarcas] = useState<string[]>([]);

  // Live filtering con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      let filtered = transmisiones;

      if (selectedTipos.length > 0) {
        const marcasSeleccionadas = selectedTipos.flatMap(tipo => 
          tiposVehiculos.find(t => t.id === tipo)?.marcas || []
        );
        filtered = filtered.filter(t => marcasSeleccionadas.includes(t.marca));
      }

      if (selectedMarcas.length > 0) {
        filtered = filtered.filter(t => selectedMarcas.includes(t.marca));
      }

      onFilterChange(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedTipos, selectedMarcas, transmisiones, onFilterChange]);

  // Obtener marcas únicas de las transmisiones
  const marcasDisponibles = useMemo(() => {
    const marcas = new Set(transmisiones.map(t => t.marca));
    return Array.from(marcas).sort();
  }, [transmisiones]);

  const toggleTipo = (tipoId: string) => {
    setSelectedTipos(prev => 
      prev.includes(tipoId) 
        ? prev.filter(t => t !== tipoId)
        : [...prev, tipoId]
    );
  };

  const toggleMarca = (marca: string) => {
    setSelectedMarcas(prev => 
      prev.includes(marca) 
        ? prev.filter(m => m !== marca)
        : [...prev, marca]
    );
  };

  const clearFilters = () => {
    setSelectedTipos([]);
    setSelectedMarcas([]);
  };

  const getFilteredCount = () => {
    let filtered = transmisiones;

    if (selectedTipos.length > 0) {
      const marcasSeleccionadas = selectedTipos.flatMap(tipo => 
        tiposVehiculos.find(t => t.id === tipo)?.marcas || []
      );
      filtered = filtered.filter(t => marcasSeleccionadas.includes(t.marca));
    }

    if (selectedMarcas.length > 0) {
      filtered = filtered.filter(t => selectedMarcas.includes(t.marca));
    }

    return filtered.length;
  };

  return (
    <>
      {/* Botón flotante para abrir filtros */}
      <motion.button
        className="filter-button"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="filter-icon">🔍</span>
        <span>Filtrar</span>
        {(selectedTipos.length + selectedMarcas.length) > 0 && (
          <span className="filter-count">
            {selectedTipos.length + selectedMarcas.length}
          </span>
        )}
      </motion.button>

      {/* Modal fullscreen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="filter-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="filter-content"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="filter-header">
                <h2>Diagnóstico Rápido</h2>
                <button 
                  className="close-button"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="filter-section">
                <h3>Tipo de Vehículo</h3>
                <div className="tipo-grid">
                  {tiposVehiculos.map(tipo => (
                    <motion.button
                      key={tipo.id}
                      className={`tipo-button ${selectedTipos.includes(tipo.id) ? 'selected' : ''}`}
                      onClick={() => toggleTipo(tipo.id)}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="tipo-icon">{tipo.icon}</span>
                      <span>{tipo.nombre}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h3>Marca</h3>
                <div className="marca-list">
                  {marcasDisponibles.map(marca => (
                    <motion.button
                      key={marca}
                      className={`marca-button ${selectedMarcas.includes(marca) ? 'selected' : ''}`}
                      onClick={() => toggleMarca(marca)}
                      whileTap={{ scale: 0.9 }}
                    >
                      {marca}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="filter-actions">
                <button className="clear-button" onClick={clearFilters}>
                  Limpiar filtros
                </button>
                <button className="apply-button" onClick={() => setIsOpen(false)}>
                  Ver {getFilteredCount()} resultados
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FiltroTipoVehiculo;