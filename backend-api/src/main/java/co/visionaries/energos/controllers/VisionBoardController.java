package co.visionaries.energos.controllers;

import co.visionaries.energos.entities.Image;
import co.visionaries.energos.entities.VisionBoard;
import co.visionaries.energos.storage.ImageStorage;
import co.visionaries.energos.storage.QuoteStorage;
import co.visionaries.energos.storage.TextStorage;
import co.visionaries.energos.storage.VisionBoardStorage;
import org.springframework.web.bind.annotation.*;

@RestController
public class VisionBoardController {
    VisionBoardStorage visionBoardStorage;
    ImageStorage imageStorage;
    QuoteStorage quoteStorage;
    TextStorage textStorage;

    public VisionBoardController(VisionBoardStorage visionBoardStorage, ImageStorage imageStorage, QuoteStorage quoteStorage, TextStorage textStorage) {
        this.visionBoardStorage = visionBoardStorage;
        this.imageStorage = imageStorage;
        this.quoteStorage = quoteStorage;
        this.textStorage = textStorage;
    }

    @GetMapping()
    public VisionBoard getVisionBoardById (@PathVariable long visionBoardId) {
        return visionBoardStorage.retrieveVisionBoardbyId(visionBoardId);
    }

    @PatchMapping()
    public void updateVisionBoard (@RequestBody VisionBoard visionBoard) {
        VisionBoard visionBoardToUpdate = visionBoardStorage.retrieveVisionBoardbyId(visionBoard.getId());
        visionBoardToUpdate.setBackgroundColor(visionBoard.getBackgroundColor());
        visionBoardToUpdate.setGridSpacing(visionBoard.getGridSpacing());
        visionBoardToUpdate.setBackgroundImageLink(visionBoard.getBackgroundImageLink());
        visionBoardToUpdate.setGridBorderColor(visionBoard.getGridBorderColor());
        visionBoardToUpdate.setGridBorderRadius(visionBoard.getGridBorderRadius());
        visionBoardToUpdate.setGridBorderStyle(visionBoard.getGridBorderStyle());
        visionBoardToUpdate.setGridBorderThickness(visionBoard.getGridBorderThickness());
        visionBoardToUpdate.setHasGrid(visionBoard.isHasGrid());
        visionBoardToUpdate.setThemeDark(visionBoard.isThemeDark());
        visionBoardToUpdate.setGridTemplateName(visionBoard.getGridTemplateName());
    }



}