import PointsOfInterestModel from '../Models/poiModel.mjs';

// Mock the 'pool' object
jest.mock('../public/scripts/pool.mjs', () => {
  const mockQuery = jest.fn();
  return {
    query: mockQuery,
  };
});

describe('Points Of Interest Model Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve all points of interest', async () => {
    const pointsOfInterestModel = new PointsOfInterestModel();
    const mockPointsOfInterest = [{ id: 1, name: 'Point A' }, { id: 2, name: 'Point B' }];

    // Configure the mockQuery function to return points of interest
    const pool = require('../public/scripts/pool.mjs');
    pool.query.mockResolvedValueOnce([mockPointsOfInterest]);

    const result = await pointsOfInterestModel.getAllPointsOfInterest();

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM point_of_interest');
    expect(result).toEqual(mockPointsOfInterest);
  });

  it('should add a point of interest', async () => {
    const pointsOfInterestModel = new PointsOfInterestModel();
    const mockInsertId = 1; // Adjust with your expected insert ID

    // Configure the mockQuery function to return a result
    const pool = require('../public/scripts/pool.mjs');
    pool.query.mockResolvedValueOnce([{ insertId: mockInsertId }]);

    const result = await pointsOfInterestModel.addPointOfInterest({
      name: 'Point C',
      type: 'Attraction',
      country: 'Country A',
      region: 'Region A',
      lon: 1.2345,
      lat: 2.3456,
      description: 'Description',
      recommendations: 5,
    });

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), [
      'Point C',
      'Attraction',
      'Country A',
      'Region A',
      1.2345,
      2.3456,
      'Description',
      5,
    ]);
    expect(result).toBe(mockInsertId);
  });

  it('should delete a point of interest', async () => {
    const pointsOfInterestModel = new PointsOfInterestModel();
    const pointOfInterestId = 1; // Adjust with a valid point of interest ID

    // Configure the mockQuery function to return a result
    const pool = require('../public/scripts/pool.mjs');
    pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

    const result = await pointsOfInterestModel.deletePointOfInterest(pointOfInterestId);

    expect(pool.query).toHaveBeenCalledWith('DELETE FROM point_of_interest WHERE id = ?', [pointOfInterestId]);
    expect(result).toBe(1); // Assuming 1 is returned for a successful deletion
  });

  it('should get a point of interest by ID', async () => {
    const pointsOfInterestModel = new PointsOfInterestModel();
    const mockPointOfInterest = { id: 1, name: 'Point A' };

    // Configure the mockQuery function to return a result
    const pool = require('../public/scripts/pool.mjs');
    pool.query.mockResolvedValueOnce([mockPointOfInterest]);

    const result = await pointsOfInterestModel.getPointOfInterestById(1);

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM point_of_interest WHERE id = ?', [1]);
    expect(result).toEqual([mockPointOfInterest]); // Ensure the result is in an array
  });

  it('should get points of interest by recommendations', async () => {
    const pointsOfInterestModel = new PointsOfInterestModel();
    const mockPointsOfInterest = [
      { id: 1, name: 'Point A' },
      { id: 2, name: 'Point B' }
    ];
    const recommendations = 5; // Adjust with your test recommendations value

    // Configure the mockQuery function to return points of interest
    const pool = require('../public/scripts/pool.mjs');
    pool.query.mockResolvedValueOnce(mockPointsOfInterest); // Ensure it's an array

    const result = await pointsOfInterestModel.getPointsOfInterestByRecommendations(recommendations);

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM point_of_interest WHERE recommendations = ?', [recommendations]);
    expect(result).toEqual(mockPointsOfInterest); // Should match the array of points of interest
  });
});
