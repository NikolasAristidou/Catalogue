import { Product } from "./Product";

interface TV extends Product {
  screenSize: number;
  resolution: string;
  isSmart: boolean;
  hdmiPorts: number;
  energyRating?: string;
  refreshRate?: number;
}