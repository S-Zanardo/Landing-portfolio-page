import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export interface ComicItem {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  rating: number;
  publisher?: string;
  writer?: string;
  artist?: string;
}

export function useCatalog(sheetCsvUrl: string) {
  const [items, setItems] = useState<ComicItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sheetCsvUrl || sheetCsvUrl === "INSERISCI_QUI_IL_TUO_LINK_CSV") {
      setIsLoading(false);
      setError("Link al CSV di Google Sheets non configurato. Inserisci un URL valido.");
      return;
    }

    Papa.parse(sheetCsvUrl, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(), // Rende minuscole le intestazioni (Title -> title)
      complete: (results) => {
        // Filtra righe vuote per evitare crash e key prop errors
        const validItems = (results.data as any[]).filter(
          (item) => item && item.id != null && item.title != null
        );
        setItems(validItems as ComicItem[]);
        setIsLoading(false);
      },
      error: (error: any) => {
        console.error("Errore durante il parsing del CSV:", error);
        setError(error.message);
        setIsLoading(false);
      }
    });
  }, [sheetCsvUrl]);

  return { items, isLoading, error };
}