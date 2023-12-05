from django.test import TestCase

# Create your tests here.
class Stock_Test(TestCase):
    def test_Stock(self):
        output=5
        self.assertEqual(5,output)
