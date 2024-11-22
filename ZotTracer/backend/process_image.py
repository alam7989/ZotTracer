import numpy as np
import torch
import matplotlib.pyplot as plt
import cv2
import tempfile

from segment_anything import SamPredictor, sam_model_registry

def getMask(file):
    image = cv2.imread(file)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = image.astype('float32') # convert the image to float32 for compatibility

    input_point = np.array([[len(image)/2, len(image)/2]]) # select middle of the image
    input_label = np.array([1])

    sam = sam_model_registry["vit_h"](checkpoint="sam_vit_h_4b8939.pth")
    predictor = SamPredictor(sam)

    mask, score, logits = predictor.predict(
        point_coords=input_point,
        point_labels=input_label,
        multimask_output=True, # generate 3 masks
    )

    # save the mask as a png to a temporary file
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        plt.imsave(temp_file.name, mask[-1]) # use the 3rd mask

        # get the outline of the mask
        greyscale_img = cv2.imread(temp_file.name, cv2.IMREAD_GRAYSCALE)
        edges = cv2.Canny(greyscale_img, threshold1=50, threshold2=150) # edge detection

