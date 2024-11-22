import numpy as np
import torch
import matplotlib
import matplotlib.pyplot as plt
import cv2
import tempfile

from segment_anything import SamPredictor, sam_model_registry

def reshapeMask(mask, ax, random_color=False):
    if random_color:
        color = np.concatenate([np.random.random(3), np.array([0.6])], axis=0)
    else:
        color = np.array([30/255, 144/255, 255/255, 0.6])
    h, w = mask.shape[-2:]
    mask_image = mask.reshape(h, w, 1) * color.reshape(1, 1, -1)
    return mask_image

def show_mask(mask, ax, random_color=False):
    if random_color:
        color = np.concatenate([np.random.random(3), np.array([0.6])], axis=0)
    else:
        color = np.array([30/255, 144/255, 255/255, 0.6])
    h, w = mask.shape[-2:]
    mask_image = mask.reshape(h, w, 1) * color.reshape(1, 1, -1)
    ax.imshow(mask_image)

def getMask(file):
    print(type(file))
    matplotlib.use('agg')
    print("HELLO")
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        file.save(temp_file.name)
        image = cv2.imread(temp_file.name)
        
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    print(image.shape)
    image = image.astype('float32') # convert the image to float32 for compatibility
    print("\n\nNAME", temp_file.name)
    input_point = np.array([[len(image)/2, len(image)/2]]) # select middle of the image
    input_label = np.array([1])
    print("here girl") 

    # plt.figure(figsize=(10,10))
    # plt.imshow(image)
    # plt.axis('on')
    # plt.show() 
    # print("here girl") 

    sam = sam_model_registry["vit_h"](checkpoint="sam_vit_h_4b8939.pth")
    predictor = SamPredictor(sam)
    print("YES SAM")

    predictor.set_image(image)
    print("image set")
    masks, scores, logits = predictor.predict(
        point_coords=input_point,
        point_labels=input_label,
        multimask_output=True, # generate 3 masks
    )
    mask = masks[-1]
    score = scores[-1]
    # plt.figure(figsize=(10,10))
    show_mask(mask, plt.gca())
    # show_points(input_point, input_label, plt.gca())
    plt.axis('off')
    plt.show()

    reshaped_mask = reshapeMask(mask, plt.gca())
    print("\n\n MY MASK\n\n")
    print(reshaped_mask.shape, type(reshaped_mask))
    print(reshaped_mask)

    # save the mask as a png to a temporary file
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        print("ok gona save")
        # plt.savefig(temp_file.name)
        cv2.imwrite(temp_file.name, reshaped_mask)
        print("girl saved")

        # get the outline of the mask
        bgr = cv2.imread(temp_file.name)
        print("\n\nBGR", bgr.shape, bgr)
        gray = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
        print("grey")
        _, roi = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY)
        plt.imshow(roi)
        cont = cv2.findContours(roi, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        output = np.zeros(gray.shape, dtype=np.uint8)
        cv2.drawContours(output, cont[0], -1, (255, 255, 255))

        # removing boundary
        boundary = 255*np.ones(gray.shape, dtype=np.uint8)
        boundary[1:boundary.shape[0]-1, 1:boundary.shape[1]-1] = 0

        toremove = output & boundary
        output = output ^ toremove
        print("OUTPUTGIRL", output)