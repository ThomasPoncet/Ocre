import matplotlib.colors as mcolors
import matplotlib.cm as cm


def make_colormap(seq):
    """Return a LinearSegmentedColormap
    seq: a sequence of floats and RGB-tuples. The floats should be increasing
    and in the interval (0,1).
    """
    seq = [(None,) * 3, 0.0] + list(seq) + [1.0, (None,) * 3]
    cdict = {'red': [], 'green': [], 'blue': []}
    for i, item in enumerate(seq):
        if isinstance(item, float):
            r1, g1, b1 = seq[i - 1]
            r2, g2, b2 = seq[i + 1]
            cdict['red'].append([item, r1, r2])
            cdict['green'].append([item, g1, g2])
            cdict['blue'].append([item, b1, b2])
    return mcolors.LinearSegmentedColormap('CustomMap', cdict)


def make_white_gradient(center_color_rgb, normalizer):
    color_map  = make_colormap([color_converter('white'), center_color_rgb, 0.50,
                                center_color_rgb, color_converter('white')])
    return cm.ScalarMappable(norm=normalizer, cmap=color_map)

color_converter = mcolors.ColorConverter().to_rgb
redtoblue = make_colormap([color_converter('red'), color_converter('blue')])
white_black_white = make_colormap(
        [color_converter('white'), color_converter('black'),0.55,
         color_converter('black'), color_converter('white')])
