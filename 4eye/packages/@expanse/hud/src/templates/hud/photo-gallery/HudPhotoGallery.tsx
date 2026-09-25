"use client";
/**
 * HUD Template: Photo Gallery
 *
 * Photo viewing application layout:
 * - Thumbnail strip
 * - Full-screen view
 * - EXIF info panel
 * - Slideshow mode
 * - Edit tools
 * - Zoom/pan controls
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for photo galleries, image viewers, and lightbox interfaces.
 */

import React, { useState, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Slider,
  Chip,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import CropIcon from "@mui/icons-material/Crop";
import TuneIcon from "@mui/icons-material/Tune";

// =============================================================================
// Types
// =============================================================================

export interface Photo {
  id: string;
  url: string;
  thumbnailUrl?: string;
  title?: string;
  isFavorite?: boolean;
}

export interface ExifData {
  camera?: string;
  lens?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: number;
  focalLength?: string;
  dateTaken?: string;
  dimensions?: string;
  fileSize?: string;
}

export interface HudPhotoGalleryProps {
  children?: ReactNode;
  photos?: Photo[];
  currentIndex?: number;
  exifData?: ExifData;
  zoom?: number;
  isSlideshowPlaying?: boolean;
  slideshowInterval?: number;
  onPrev?: () => void;
  onNext?: () => void;
  onSelectPhoto?: (index: number) => void;
  onClose?: () => void;
  onZoomChange?: (zoom: number) => void;
  onFitToScreen?: () => void;
  onFullscreen?: () => void;
  onSlideshowToggle?: () => void;
  onFavoriteToggle?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
  onRotateLeft?: () => void;
  onRotateRight?: () => void;
}

// =============================================================================
// Template Component
// =============================================================================

export function HudPhotoGallery({
  children,
  photos = [],
  currentIndex = 0,
  exifData,
  zoom = 100,
  isSlideshowPlaying = false,
  slideshowInterval = 5,
  onPrev,
  onNext,
  onSelectPhoto,
  onClose,
  onZoomChange,
  onFitToScreen,
  onFullscreen,
  onSlideshowToggle,
  onFavoriteToggle,
  onDelete,
  onShare,
  onDownload,
  onEdit,
  onRotateLeft,
  onRotateRight,
}: HudPhotoGalleryProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const bgColor = "#000000";
  const panelBg = "rgba(30, 30, 30, 0.9)";
  const textColor = "#ffffff";

  // Default photos
  const displayPhotos: Photo[] = photos.length > 0 ? photos : Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    url: `https://picsum.photos/seed/${i + 1}/1920/1080`,
    thumbnailUrl: `https://picsum.photos/seed/${i + 1}/150/100`,
    title: `Photo ${i + 1}`,
    isFavorite: i % 3 === 0,
  }));

  // Default EXIF
  const displayExif: ExifData = exifData || {
    camera: "Canon EOS R5",
    lens: "RF 24-70mm f/2.8L IS USM",
    aperture: "f/2.8",
    shutterSpeed: "1/250s",
    iso: 400,
    focalLength: "50mm",
    dateTaken: "2024-03-15 14:32",
    dimensions: "8192 × 5464",
    fileSize: "24.5 MB",
  };

  const currentPhoto = displayPhotos[currentIndex];
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < displayPhotos.length - 1;

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: bgColor,
        position: "relative",
        overflow: "hidden",
      }}
      onClick={() => setShowControls(!showControls)}
    >
      {/* ================================================================= */}
      {/* TOP BAR */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
          opacity: showControls ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 1000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={onClose} sx={{ color: textColor }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="subtitle1" sx={{ color: textColor }}>
            {currentPhoto?.title || `Photo ${currentIndex + 1}`}
          </Typography>
          <Chip
            label={`${currentIndex + 1} / ${displayPhotos.length}`}
            size="small"
            sx={{ bgcolor: "rgba(255,255,255,0.1)", color: textColor }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton onClick={onFavoriteToggle} sx={{ color: currentPhoto?.isFavorite ? "#ef4444" : textColor }}>
            {currentPhoto?.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton onClick={() => setShowInfo(!showInfo)} sx={{ color: showInfo ? "#3b82f6" : textColor }}>
            <InfoIcon />
          </IconButton>
          <IconButton onClick={onShare} sx={{ color: textColor }}>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={onDownload} sx={{ color: textColor }}>
            <DownloadIcon />
          </IconButton>
          <IconButton onClick={onDelete} sx={{ color: textColor }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      {/* ================================================================= */}
      {/* SIDE NAVIGATION */}
      {/* ================================================================= */}
      {/* Left Arrow */}
      <Box
        onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
        sx={{
          position: "fixed",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: 80,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: canGoPrev ? "pointer" : "default",
          opacity: showControls && canGoPrev ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 999,
        }}
      >
        <IconButton sx={{ color: textColor, bgcolor: "rgba(0,0,0,0.5)", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}>
          <ChevronLeftIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
      {/* Right Arrow */}
      <Box
        onClick={(e) => { e.stopPropagation(); onNext?.(); }}
        sx={{
          position: "fixed",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: 80,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: canGoNext ? "pointer" : "default",
          opacity: showControls && canGoNext ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 999,
        }}
      >
        <IconButton sx={{ color: textColor, bgcolor: "rgba(0,0,0,0.5)", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}>
          <ChevronRightIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
      {/* ================================================================= */}
      {/* RIGHT: EXIF Info Panel */}
      {/* ================================================================= */}
      {showInfo && (
        <Paper
          sx={{
            position: "fixed",
            top: 72,
            right: 16,
            width: 280,
            bgcolor: panelBg,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            p: 2,
            zIndex: 999,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography variant="subtitle2" sx={{ color: textColor, mb: 2 }}>
            Photo Info
          </Typography>

          {Object.entries(displayExif).map(([key, value]) => (
            <Box key={key} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="caption" sx={{ color: textColor, opacity: 0.5, textTransform: "capitalize" }}>
                {key.replace(/([A-Z])/g, " $1").trim()}
              </Typography>
              <Typography variant="caption" sx={{ color: textColor }}>
                {value}
              </Typography>
            </Box>
          ))}
        </Paper>
      )}
      {/* ================================================================= */}
      {/* BOTTOM: Controls & Thumbnails */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
          opacity: showControls ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 1000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Thumbnail Strip */}
        {showThumbnails && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              p: 1,
              overflowX: "auto",
              justifyContent: "center",
              "&::-webkit-scrollbar": { height: 6 },
              "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.3)", borderRadius: 3 },
            }}
          >
            {displayPhotos.map((photo, idx) => (
              <Box
                key={photo.id}
                onClick={() => onSelectPhoto?.(idx)}
                sx={{
                  width: 60,
                  height: 40,
                  borderRadius: 1,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: idx === currentIndex ? "2px solid white" : "2px solid transparent",
                  opacity: idx === currentIndex ? 1 : 0.5,
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                  "&:hover": { opacity: 1 },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    bgcolor: "#333",
                    backgroundImage: photo.thumbnailUrl ? `url(${photo.thumbnailUrl})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </Box>
            ))}
          </Box>
        )}

        {/* Controls */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, p: 2 }}>
          {/* Edit Tools */}
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton onClick={onRotateLeft} sx={{ color: textColor }}>
              <RotateLeftIcon />
            </IconButton>
            <IconButton onClick={onRotateRight} sx={{ color: textColor }}>
              <RotateRightIcon />
            </IconButton>
            <IconButton onClick={onEdit} sx={{ color: textColor }}>
              <TuneIcon />
            </IconButton>
            <IconButton onClick={onEdit} sx={{ color: textColor }}>
              <CropIcon />
            </IconButton>
          </Box>

          {/* Zoom */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 180 }}>
            <IconButton onClick={() => onZoomChange?.(Math.max(25, zoom - 25))} sx={{ color: textColor }}>
              <ZoomOutIcon />
            </IconButton>
            <Slider
              value={zoom}
              min={25}
              max={400}
              onChange={(_, v) => onZoomChange?.(v as number)}
              size="small"
              sx={{ color: textColor, width: 100 }}
            />
            <IconButton onClick={() => onZoomChange?.(Math.min(400, zoom + 25))} sx={{ color: textColor }}>
              <ZoomInIcon />
            </IconButton>
            <Typography variant="caption" sx={{ color: textColor, minWidth: 40 }}>
              {zoom}%
            </Typography>
          </Box>

          {/* View Controls */}
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton onClick={onFitToScreen} sx={{ color: textColor }}>
              <FitScreenIcon />
            </IconButton>
            <IconButton onClick={onFullscreen} sx={{ color: textColor }}>
              <FullscreenIcon />
            </IconButton>
            <IconButton
              onClick={onSlideshowToggle}
              sx={{ color: isSlideshowPlaying ? "#22c55e" : textColor }}
            >
              {isSlideshowPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          </Box>
        </Box>
      </Box>
      {/* ================================================================= */}
      {/* MAIN CONTENT - Photo View */}
      {/* ================================================================= */}
      {children ?? (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {currentPhoto?.url ? (
            <Box
              component="img"
              src={currentPhoto.url}
              alt={currentPhoto.title}
              sx={{
                maxWidth: `${zoom}%`,
                maxHeight: `${zoom}%`,
                objectFit: "contain",
                transition: "all 0.3s ease",
              }}
            />
          ) : (
            <Typography variant="h4" sx={{ color: textColor, opacity: 0.2 }}>
              No Photo
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
